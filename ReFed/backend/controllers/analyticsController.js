const Listing = require('../models/Listing');
const Mission = require('../models/Mission');
const User = require('../models/User');

// @desc    Get dashboard analytics
// @route   GET /api/analytics/dashboard
// @access  Private
exports.getDashboardAnalytics = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const userType = req.user.userType;

    let analytics = {};

    if (userType === 'donor') {
      // Donor analytics
      const totalListings = await Listing.countDocuments({ donor: userId });
      const activeListings = await Listing.countDocuments({ 
        donor: userId, 
        status: 'available' 
      });
      const completedDonations = await Listing.countDocuments({ 
        donor: userId, 
        status: 'completed' 
      });

      analytics = {
        totalListings,
        activeListings,
        completedDonations,
        impactScore: req.user.stats.impactScore,
        totalDonations: req.user.stats.totalDonations
      };

    } else if (userType === 'volunteer') {
      // Volunteer analytics
      const totalMissions = await Mission.countDocuments({ volunteer: userId });
      const activeMissions = await Mission.countDocuments({ 
        volunteer: userId, 
        status: { $in: ['pending', 'accepted', 'in_progress'] }
      });
      const completedMissions = await Mission.countDocuments({ 
        volunteer: userId, 
        status: 'completed' 
      });

      analytics = {
        totalMissions,
        activeMissions,
        completedMissions,
        impactScore: req.user.stats.impactScore,
        missionsCompleted: req.user.stats.missionsCompleted
      };

    } else if (userType === 'ngo' || userType === 'receiver') {
      // Receiver/NGO analytics
      const totalReceived = await Listing.countDocuments({ 
        claimedBy: userId,
        status: 'completed'
      });
      
      analytics = {
        totalReceived,
        impactScore: req.user.stats.impactScore,
        totalDonationsReceived: req.user.stats.totalReceived
      };
    }

    res.json({
      success: true,
      analytics
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get platform-wide statistics
// @route   GET /api/analytics/platform
// @access  Public
exports.getPlatformStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDonors = await User.countDocuments({ userType: 'donor' });
    const totalVolunteers = await User.countDocuments({ userType: 'volunteer' });
    const totalNGOs = await User.countDocuments({ userType: 'ngo' });
    
    const totalListings = await Listing.countDocuments();
    const activeListings = await Listing.countDocuments({ status: 'available' });
    const completedDonations = await Listing.countDocuments({ status: 'completed' });
    
    const totalMissions = await Mission.countDocuments();
    const completedMissions = await Mission.countDocuments({ status: 'completed' });

    // Calculate total meals served (estimate)
    const listings = await Listing.find({ status: 'completed' }).select('servings');
    const totalMealsServed = listings.reduce((sum, listing) => sum + (listing.servings || 0), 0);

    const stats = {
      users: {
        total: totalUsers,
        donors: totalDonors,
        volunteers: totalVolunteers,
        ngos: totalNGOs
      },
      listings: {
        total: totalListings,
        active: activeListings,
        completed: completedDonations
      },
      missions: {
        total: totalMissions,
        completed: completedMissions
      },
      impact: {
        totalMealsServed,
        peopleHelped: Math.floor(totalMealsServed), // Estimate 1 meal per person
        carbonOffset: (completedMissions * 2.5).toFixed(2) // Estimate 2.5kg CO2 saved per mission
      }
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user activity timeline
// @route   GET /api/analytics/timeline
// @access  Private
exports.getUserTimeline = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { days = 30 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get listings created
    const listings = await Listing.find({
      donor: userId,
      createdAt: { $gte: startDate }
    }).select('title status createdAt');

    // Get missions
    const missions = await Mission.find({
      $or: [{ donor: userId }, { volunteer: userId }],
      createdAt: { $gte: startDate }
    }).select('status createdAt').populate('listing', 'title');

    // Combine and sort timeline
    const timeline = [
      ...listings.map(l => ({
        type: 'listing',
        title: l.title,
        status: l.status,
        date: l.createdAt
      })),
      ...missions.map(m => ({
        type: 'mission',
        title: m.listing?.title || 'Mission',
        status: m.status,
        date: m.createdAt
      }))
    ].sort((a, b) => b.date - a.date);

    res.json({
      success: true,
      count: timeline.length,
      timeline
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get impact metrics
// @route   GET /api/analytics/impact
// @access  Private
exports.getImpactMetrics = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Get completed listings
    const completedListings = await Listing.find({
      donor: userId,
      status: 'completed'
    }).select('servings');

    const totalServings = completedListings.reduce(
      (sum, listing) => sum + (listing.servings || 0), 
      0
    );

    // Get completed missions
    const completedMissions = await Mission.find({
      volunteer: userId,
      status: 'completed'
    }).select('impactMetrics');

    const totalMissions = completedMissions.length;

    // Calculate estimates
    const mealsServed = totalServings;
    const peopleHelped = mealsServed; // Estimate 1 meal per person
    const carbonOffset = (totalMissions * 2.5).toFixed(2); // 2.5kg CO2 per mission
    const foodSaved = (totalServings * 0.5).toFixed(2); // 0.5kg per serving

    const impact = {
      mealsServed,
      peopleHelped,
      carbonOffsetKg: parseFloat(carbonOffset),
      foodSavedKg: parseFloat(foodSaved),
      missionsCompleted: totalMissions,
      impactScore: req.user.stats.impactScore
    };

    res.json({
      success: true,
      impact
    });
  } catch (error) {
    next(error);
  }
};