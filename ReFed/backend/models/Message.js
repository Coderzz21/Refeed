const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  conversation: {
    type: String,
    required: true,
    index: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing'
  },
  mission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mission'
  },
  content: {
    type: String,
    required: true,
    maxlength: 1000
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'location', 'system'],
    default: 'text'
  },
  attachments: [{
    type: String
  }],
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Compound index for efficient conversation queries
messageSchema.index({ conversation: 1, createdAt: -1 });

module.exports = mongoose.model('Message', messageSchema);