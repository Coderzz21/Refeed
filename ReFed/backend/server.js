const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/error');
const { initSocket } = require('./utils/socket');
const http = require('http');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Security headers
app.use(helmet());

// Compression
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// Static folder
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/listings', require('./routes/listings'));
// Uncomment when you create these routes
// app.use('/api/missions', require('./routes/missions'));
// app.use('/api/chat', require('./routes/chat'));
// app.use('/api/analytics', require('./routes/analytics'));

// Error handler
app.use(errorHandler);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Refeed API is running',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
initSocket(server);

server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   🍽️  Refeed Server Running            ║
║   📡 Port: ${PORT}                      ║
║   🌍 Environment: ${process.env.NODE_ENV || 'development'}      ║
║   🚀 Socket.io: Initialized           ║
╚════════════════════════════════════════╝
  `);
});