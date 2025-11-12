const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: 1000
  },
  foodType: {
    type: String,
    required: true,
    enum: ['cooked', 'raw', 'packaged', 'groceries', 'other']
  },
  category: {
    type: String,
    enum: ['vegetarian', 'non-vegetarian', 'vegan', 'mixed'],
    default: 'mixed'
  },
  quantity: {
    type: String,
    required: [true, 'Please specify quantity']
  },
  servings: {
    type: Number,
    min: 1
  },
  images: [{
    type: String
  }],
  pickupLocation: {
    address: {
      type: String,
      required: true
    },
    coordinates: {
      lat: {
        type: Number,
        required: true
      },
      lng: {
        type: Number,
        required: true
      }
    }
  },
  availableFrom: {
    type: Date,
    required: true
  },
  availableUntil: {
    type: Date,
    required: true
  },
  expiryDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['available', 'claimed', 'completed', 'expired', 'cancelled'],
    default: 'available'
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  claimedAt: {
    type: Date
  },
  completedAt: {
    type: Date
  },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  requirements: {
    refrigeration: { type: Boolean, default: false },
    transportation: { type: Boolean, default: false },
    specialHandling: { type: String }
  },
  views: {
    type: Number,
    default: 0
  },
  interestedUsers: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Index for geospatial queries
listingSchema.index({ 'pickupLocation.coordinates': '2dsphere' });

// Index for filtering
listingSchema.index({ status: 1, availableUntil: 1 });

module.exports = mongoose.model('Listing', listingSchema);