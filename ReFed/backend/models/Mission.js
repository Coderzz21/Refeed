const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    required: true
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  volunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'in_progress', 'completed', 'cancelled', 'failed'],
    default: 'pending'
  },
  pickupLocation: {
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  deliveryLocation: {
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  scheduledPickupTime: {
    type: Date,
    required: true
  },
  scheduledDeliveryTime: {
    type: Date
  },
  actualPickupTime: {
    type: Date
  },
  actualDeliveryTime: {
    type: Date
  },
  estimatedDistance: {
    type: Number // in kilometers
  },
  trackingUpdates: [{
    status: String,
    location: {
      lat: Number,
      lng: Number
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    note: String
  }],
  photos: {
    pickup: [String],
    delivery: [String]
  },
  rating: {
    donorRating: {
      score: { type: Number, min: 1, max: 5 },
      comment: String
    },
    volunteerRating: {
      score: { type: Number, min: 1, max: 5 },
      comment: String
    },
    receiverRating: {
      score: { type: Number, min: 1, max: 5 },
      comment: String
    }
  },
  notes: {
    type: String,
    maxlength: 500
  },
  cancellationReason: {
    type: String
  },
  impactMetrics: {
    mealsServed: Number,
    peopleHelped: Number,
    carbonOffset: Number
  }
}, {
  timestamps: true
});

// Index for tracking active missions
missionSchema.index({ volunteer: 1, status: 1 });
missionSchema.index({ status: 1, scheduledPickupTime: 1 });

module.exports = mongoose.model('Mission', missionSchema);