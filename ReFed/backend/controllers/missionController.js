const Mission = require('../models/Mission');
const Listing = require('../models/Listing');
const User = require('../models/User');
const { emitToUser } = require('../utils/socket');
const sendSMS = require('../utils/sendSMS');

// @desc    Create new mission
// @route   POST /api/missions
// @access  Private (Volunteer)
exports.createMission = async (req, res, next) => {
  try {
    const { listingId, deliveryAddress, scheduledPickupTime } = req.body;

    // Check listing exists and is claimed
    const listing = await Listing.findById(listingId).populate('donor');

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    if (listing.status !== 'claimed') {
      return res.status(400).json({
        success: false,
        message: 'Listing is not claimed'
      });
    }

    // Create mission
    const mission = await Mission.create({
      listing: listingId,
      donor: listing.donor._id,
      volunteer: req.user._id,
      pickupLocation: listing.pickupLocation,
      deliveryLocation: deliveryAddress,
      scheduledPickupTime,
      status: 'pending'
    });

    // Send notification to donor
    await sendSMS(
      listing.donor.phone,
      `A volunteer has offered to pickup your donation. Check the app for details.`
    );

    // Emit socket event
    emitToUser(listing.donor._id.toString(), 'newMission', mission);

    res.status(201).json({
      success: true,
      mission
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all missions (with filters)
// @route   GET /api/missions
// @access  Private
exports.getMissions = async (req, res, next) => {
  try {
    const { status, role } = req.query;
    
    const query = {};

    // Filter by role
    if (role === 'donor') {
      query.donor = req.user._id;
    } else if (role === 'volunteer') {
      query.volunteer = req.user._id;
    } else if (role === 'receiver') {
      query.receiver = req.user._id;
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    const missions = await Mission.find(query)
      .populate('listing')
      .populate('donor', 'name profileImage phone')
      .populate('volunteer', 'name profileImage phone')
      .populate('receiver', 'name profileImage phone')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: missions.length,
      missions
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single mission
// @route   GET /api/missions/:id
// @access  Private
exports.getMission = async (req, res, next) => {
  try {
    const mission = await Mission.findById(req.params.id)
      .populate('listing')
      .populate('donor', 'name profileImage phone address')
      .populate('volunteer', 'name profileImage phone')
      .populate('receiver', 'name profileImage phone address');

    if (!mission) {
      return res.status(404).json({
        success: false,
        message: 'Mission not found'
      });
    }

    // Check authorization
    const userId = req.user._id.toString();
    const isAuthorized = [
      mission.donor._id.toString(),
      mission.volunteer._id.toString(),
      mission.receiver?._id.toString()
    ].includes(userId);

    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this mission'
      });
    }

    res.json({
      success: true,
      mission
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update mission status
// @route   PUT /api/missions/:id/status
// @access  Private
exports.updateMissionStatus = async (req, res, next) => {
  try {
    const { status, note } = req.body;

    const mission = await Mission.findById(req.params.id);

    if (!mission) {
      return res.status(404).json({
        success: false,
        message: 'Mission not found'
      });
    }

    // Update status
    mission.status = status;

    // Add tracking update
    mission.trackingUpdates.push({
      status,
      note,
      timestamp: Date.now()
    });

    // Update timestamps based on status
    if (status === 'in_progress') {
      mission.actualPickupTime = Date.now();
    } else if (status === 'completed') {
      mission.actualDeliveryTime = Date.now();
      
      // Update user stats
      await User.findByIdAndUpdate(mission.volunteer, {
        $inc: { 'stats.missionsCompleted': 1, 'stats.impactScore': 10 }
      });
      await User.findByIdAndUpdate(mission.donor, {
        $inc: { 'stats.totalDonations': 1, 'stats.impactScore': 5 }
      });

      // Update listing
      await Listing.findByIdAndUpdate(mission.listing, {
        status: 'completed',
        completedAt: Date.now()
      });
    }

    await mission.save();

    // Emit real-time update
    emitToUser(mission.donor.toString(), 'missionUpdate', mission);
    emitToUser(mission.volunteer.toString(), 'missionUpdate', mission);
    if (mission.receiver) {
      emitToUser(mission.receiver.toString(), 'missionUpdate', mission);
    }

    res.json({
      success: true,
      mission
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update mission location (real-time tracking)
// @route   PUT /api/missions/:id/location
// @access  Private (Volunteer only)
exports.updateLocation = async (req, res, next) => {
  try {
    const { lat, lng, note } = req.body;

    const mission = await Mission.findById(req.params.id);

    if (!mission) {
      return res.status(404).json({
        success: false,
        message: 'Mission not found'
      });
    }

    // Check if user is the volunteer
    if (mission.volunteer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Only the volunteer can update location'
      });
    }

    // Add location update
    mission.trackingUpdates.push({
      status: 'location_update',
      location: { lat, lng },
      note,
      timestamp: Date.now()
    });

    await mission.save();

    // Emit real-time location update
    const locationData = {
      missionId: mission._id,
      location: { lat, lng },
      timestamp: Date.now()
    };

    emitToUser(mission.donor.toString(), 'locationUpdate', locationData);
    if (mission.receiver) {
      emitToUser(mission.receiver.toString(), 'locationUpdate', locationData);
    }

    res.json({
      success: true,
      message: 'Location updated'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Rate mission participants
// @route   POST /api/missions/:id/rate
// @access  Private
exports.rateMission = async (req, res, next) => {
  try {
    const { ratingFor, score, comment } = req.body;

    const mission = await Mission.findById(req.params.id);

    if (!mission) {
      return res.status(404).json({
        success: false,
        message: 'Mission not found'
      });
    }

    if (mission.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Can only rate completed missions'
      });
    }

    // Update rating based on who is rating whom
    if (ratingFor === 'donor' && req.user._id.toString() === mission.volunteer.toString()) {
      mission.rating.donorRating = { score, comment };
    } else if (ratingFor === 'volunteer' && req.user._id.toString() === mission.donor.toString()) {
      mission.rating.volunteerRating = { score, comment };
    } else {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to rate this user'
      });
    }

    await mission.save();

    res.json({
      success: true,
      message: 'Rating submitted'
    });
  } catch (error) {
    next(error);
  }
};