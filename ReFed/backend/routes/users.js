const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateProfile,
  uploadProfileImage,
  getUserStats,
  rateUser,
  getNearbyUsers
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/nearby', protect, getNearbyUsers);
router.get('/stats', protect, getUserStats);
router.get('/:id', getUserProfile);
router.put('/profile', protect, updateProfile);
router.post('/profile/image', protect, upload.single('image'), uploadProfileImage);
router.post('/:id/rate', protect, rateUser);

module.exports = router;