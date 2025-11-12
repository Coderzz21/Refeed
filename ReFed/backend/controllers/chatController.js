const Message = require('../models/Message');
const { generateConversationId } = require('../utils/helpers');
const { emitToUser } = require('../utils/socket');

// @desc    Send a message
// @route   POST /api/chat/messages
// @access  Private
exports.sendMessage = async (req, res, next) => {
  try {
    const { receiverId, content, listingId, missionId, messageType = 'text' } = req.body;

    if (!receiverId || !content) {
      return res.status(400).json({
        success: false,
        message: 'Receiver and content are required'
      });
    }

    // Generate conversation ID
    const conversationId = generateConversationId(req.user._id, receiverId);

    // Create message
    const message = await Message.create({
      conversation: conversationId,
      sender: req.user._id,
      receiver: receiverId,
      content,
      messageType,
      listing: listingId,
      mission: missionId
    });

    // Populate sender info
    await message.populate('sender', 'name profileImage');

    // Emit real-time message to receiver
    emitToUser(receiverId, 'newMessage', message);

    res.status(201).json({
      success: true,
      message
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get conversation messages
// @route   GET /api/chat/conversations/:userId
// @access  Private
exports.getConversation = async (req, res, next) => {
  try {
    const otherUserId = req.params.userId;
    const conversationId = generateConversationId(req.user._id, otherUserId);

    const { page = 1, limit = 50 } = req.query;
    const skip = (page - 1) * limit;

    const messages = await Message.find({ conversation: conversationId })
      .populate('sender', 'name profileImage')
      .populate('receiver', 'name profileImage')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Message.countDocuments({ conversation: conversationId });

    res.json({
      success: true,
      count: messages.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      messages: messages.reverse() // Reverse to show oldest first
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all conversations for current user
// @route   GET /api/chat/conversations
// @access  Private
exports.getConversations = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Get all unique conversations
    const messages = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: userId },
            { receiver: userId }
          ]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: '$conversation',
          lastMessage: { $first: '$$ROOT' },
          unreadCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$receiver', userId] },
                    { $eq: ['$isRead', false] }
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      },
      {
        $sort: { 'lastMessage.createdAt': -1 }
      }
    ]);

    // Populate user details
    await Message.populate(messages, {
      path: 'lastMessage.sender lastMessage.receiver',
      select: 'name profileImage'
    });

    const conversations = messages.map(conv => ({
      conversationId: conv._id,
      lastMessage: conv.lastMessage,
      unreadCount: conv.unreadCount,
      otherUser: conv.lastMessage.sender._id.toString() === userId.toString()
        ? conv.lastMessage.receiver
        : conv.lastMessage.sender
    }));

    res.json({
      success: true,
      count: conversations.length,
      conversations
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark messages as read
// @route   PUT /api/chat/conversations/:userId/read
// @access  Private
exports.markAsRead = async (req, res, next) => {
  try {
    const otherUserId = req.params.userId;
    const conversationId = generateConversationId(req.user._id, otherUserId);

    await Message.updateMany(
      {
        conversation: conversationId,
        receiver: req.user._id,
        isRead: false
      },
      {
        isRead: true,
        readAt: Date.now()
      }
    );

    res.json({
      success: true,
      message: 'Messages marked as read'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a message
// @route   DELETE /api/chat/messages/:id
// @access  Private
exports.deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Only sender can delete
    if (message.sender.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this message'
      });
    }

    await message.deleteOne();

    res.json({
      success: true,
      message: 'Message deleted'
    });
  } catch (error) {
    next(error);
  }
};