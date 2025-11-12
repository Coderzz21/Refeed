const socketIO = require('socket.io');

let io;
const connectedUsers = new Map();

const initSocket = (server) => {
  io = socketIO(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(`✅ User connected: ${socket.id}`);

    // User joins with their ID
    socket.on('join', (userId) => {
      connectedUsers.set(userId, socket.id);
      socket.join(userId);
      console.log(`User ${userId} joined with socket ${socket.id}`);
    });

    // Join conversation room
    socket.on('joinConversation', (conversationId) => {
      socket.join(conversationId);
      console.log(`Socket ${socket.id} joined conversation ${conversationId}`);
    });

    // Handle new message
    socket.on('sendMessage', (data) => {
      io.to(data.conversation).emit('newMessage', data);
    });

    // Handle typing indicator
    socket.on('typing', (data) => {
      socket.to(data.conversation).emit('userTyping', data);
    });

    // Handle location updates for missions
    socket.on('updateLocation', (data) => {
      io.to(data.missionId).emit('locationUpdate', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      // Remove user from connected users
      for (let [userId, socketId] of connectedUsers.entries()) {
        if (socketId === socket.id) {
          connectedUsers.delete(userId);
          break;
        }
      }
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

const emitToUser = (userId, event, data) => {
  const socketId = connectedUsers.get(userId);
  if (socketId && io) {
    io.to(socketId).emit(event, data);
  }
};

module.exports = { initSocket, getIO, emitToUser };