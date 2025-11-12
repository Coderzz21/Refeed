const User = require('../models/User');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Public
exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      phone: req.body.phone,
      bio: req.body.bio,
      address: req.body.address
    };

    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(
      key => fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );

    const user = await User.findByIdAndUpdate(
      req.user._id,
      fieldsToUpdate,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload profile image
// @route   POST /api/users/profile/image
// @access  Private
exports.uploadProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image'
      });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'refeed/profiles',
      width: 300,
      height: 300,
      crop: 'fill'
    });

    // Delete local file
    fs.unlinkSync(req.file.path);

    // Update user
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profileImage: result.secure_url },
      { new: true }
    );

    res.json({
      success: true,
      imageUrl: result.secure_url,
      user
    });
  } catch (error) {
    // Clean up file if error occurs
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};

// @desc    Get user stats
// @route   GET /api/users/stats
// @access  Private
exports.getUserStats = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    res.json({
      success: true,
      stats: user.stats
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Rate a user
// @route   POST /api/users/:id/rate
// @access  Private
exports.rateUser = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a rating between 1 and 5'
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Calculate new average rating
    const totalRatings = user.totalRatings + 1;
    const newRating = ((user.rating * user.totalRatings) + rating) / totalRatings;

    user.rating = newRating;
    user.totalRatings = totalRatings;
    await user.save();

    res.json({
      success: true,
      rating: newRating,
      totalRatings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get nearby users
// @route   GET /api/users/nearby
// @access  Private
exports.getNearbyUsers = async (req, res, next) => {
  try {
    const { lat, lng, radius = 10, userType } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: 'Please provide latitude and longitude'
      });
    }

    const query = {
      'address.coordinates.lat': {
        $gte: parseFloat(lat) - (radius / 111),
        $lte: parseFloat(lat) + (radius / 111)
      },
      'address.coordinates.lng': {
        $gte: parseFloat(lng) - (radius / (111 * Math.cos(lat * Math.PI / 180))),
        $lte: parseFloat(lng) + (radius / (111 * Math.cos(lat * Math.PI / 180)))
      },
      _id: { $ne: req.user._id }
    };

    if (userType) {
      query.userType = userType;
    }

    const users = await User.find(query).select('-password').limit(20);

    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    next(error);
  }
};