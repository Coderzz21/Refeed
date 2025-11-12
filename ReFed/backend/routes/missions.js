const express = require('express');
const router = express.Router();
const {
  createMission,
  getMissions,
  getMission,
  updateMissionStatus,
  updateLocation,
  rateMission
} = require('../controllers/missionController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, getMissions)
  .post(protect, authorize('volunteer'), createMission);

router.get('/:id', protect, getMission);
router.put('/:id/status', protect, updateMissionStatus);
router.put('/:id/location', protect, authorize('volunteer'), updateLocation);
router.post('/:id/rate', protect, rateMission);

module.exports = router;