const Listing = require('../models/Listing');
const Request = require('../models/Request');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const { calculateDistance, isListingExpired } = require('../utils/helpers');

// @desc    Create new listing
// @route   POST /api/listings
// @access  Private (Donor only)
exports.createListing = async (req, res, next) => {
  try {
    req.body.donor = req.user._id;

    const listing = await Listing.create(req.body);

    res.status(201).json({
      success: true,
      listing
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all listings with filters
// @route   GET /api/listings
// @access  Public
exports.getListings = async (req, res, next) => {
  try {
    const { 
      status, 
      foodType, 
      category, 
      urgency,
      lat, 
      lng, 
      radius = 10,
      page = 1,
      limit = 10
    } = req.query;

    const query = {};

    // Filter by status (default to available)
    if (status) {
      query.status = status;
    } else {
      query.status = 'available';
    }

    // Additional filters
    if (foodType) query.foodType = foodType;
    if (category) query.category = category;
    if (urgency) query.urgency = urgency;

    // Geospatial filter
    if (lat && lng) {
      const radiusInRadians = radius / 6371; // Earth radius in km
      
      query['pickupLocation.coordinates'] = {
        $geoWithin: {
          $centerSphere: [[parseFloat(lng), parseFloat(lat)], radiusInRadians]
        }
      };
    }

    // Pagination
    const skip = (page - 1) * limit;

    const listings = await Listing.find(query)
      .populate('donor', 'name profileImage rating address phone')
      .populate('claimedBy', 'name profileImage phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Listing.countDocuments(query);

    res.json({
      success: true,
      count: listings.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      listings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single listing
// @route   GET /api/listings/:id
// @access  Public
exports.getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('donor', 'name profileImage rating address phone email')
      .populate('claimedBy', 'name profileImage phone');

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    // Increment views
    listing.views += 1;
    await listing.save();

    res.json({
      success: true,
      listing
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update listing
// @route   PUT /api/listings/:id
// @access  Private (Owner only)
exports.updateListing = async (req, res, next) => {
  try {
    let listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    // Check ownership
    if (listing.donor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this listing'
      });
    }

    listing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      listing
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete listing
// @route   DELETE /api/listings/:id
// @access  Private (Owner only)
exports.deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    // Check ownership
    if (listing.donor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this listing'
      });
    }

    await listing.deleteOne();

    res.json({
      success: true,
      message: 'Listing deleted'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload listing images
// @route   POST /api/listings/:id/images
// @access  Private (Owner only)
exports.uploadImages = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    // Check ownership
    if (listing.donor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please upload images'
      });
    }

    const imageUrls = [];

    // Upload each image to Cloudinary
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'refeed/listings'
      });
      imageUrls.push(result.secure_url);
      fs.unlinkSync(file.path);
    }

    listing.images.push(...imageUrls);
    await listing.save();

    res.json({
      success: true,
      images: imageUrls,
      listing
    });
  } catch (error) {
    // Clean up files
    if (req.files) {
      req.files.forEach(file => fs.unlinkSync(file.path));
    }
    next(error);
  }
};

// @desc    Claim a listing
// @route   POST /api/listings/:id/claim
// @access  Private
exports.claimListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    if (listing.status !== 'available') {
      return res.status(400).json({
        success: false,
        message: 'Listing is not available'
      });
    }

    // Check if expired
    if (isListingExpired(listing)) {
      listing.status = 'expired';
      await listing.save();
      return res.status(400).json({
        success: false,
        message: 'Listing has expired'
      });
    }

    listing.status = 'claimed';
    listing.claimedBy = req.user._id;
    listing.claimedAt = Date.now();
    await listing.save();

    res.json({
      success: true,
      message: 'Listing claimed successfully',
      listing
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get my listings
// @route   GET /api/listings/my/all
// @access  Private
exports.getMyListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({ donor: req.user._id })
      .populate('claimedBy', 'name profileImage phone')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: listings.length,
      listings
    });
  } catch (error) {
    next(error);
  }
};