const express = require('express');
const router = express.Router();
const {
  getDashboardAnalytics,
  getPlatformStats,
  getUserTimeline,
  getImpactMetrics
} = require('../controllers/analyticsController');
const { protect } = require('../middleware/auth');

router.get('/dashboard', protect, getDashboardAnalytics);
router.get('/platform', getPlatformStats);
router.get('/timeline', protect, getUserTimeline);
router.get('/impact', protect, getImpactMetrics);

module.exports = router;