const express = require('express');
const router = express.Router();
const {
  sendMessage,
  getConversation,
  getConversations,
  markAsRead,
  deleteMessage
} = require('../controllers/chatController');
const { protect } = require('../middleware/auth');

router.get('/conversations', protect, getConversations);
router.get('/conversations/:userId', protect, getConversation);
router.put('/conversations/:userId/read', protect, markAsRead);

router.route('/messages')
  .post(protect, sendMessage);

router.delete('/messages/:id', protect, deleteMessage);

module.exports = router;