// Calculate distance between two coordinates (Haversine formula)
exports.calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
};

const toRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

// Generate conversation ID from two user IDs
exports.generateConversationId = (userId1, userId2) => {
  return [userId1, userId2].sort().join('-');
};

// Format date for display
exports.formatDate = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Check if listing is expired
exports.isListingExpired = (listing) => {
  return new Date() > new Date(listing.availableUntil);
};

// Calculate urgency score based on expiry time
exports.calculateUrgency = (expiryDate) => {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const hoursUntilExpiry = (expiry - now) / (1000 * 60 * 60);
  
  if (hoursUntilExpiry < 2) return 'high';
  if (hoursUntilExpiry < 6) return 'medium';
  return 'low';
};

// Sanitize user data for response
exports.sanitizeUser = (user) => {
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};