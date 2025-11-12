const express = require('express');
const router = express.Router();
const {
  createListing,
  getListings,
  getListing,
  updateListing,
  deleteListing,
  uploadImages,
  claimListing,
  getMyListings
} = require('../controllers/listingController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.route('/')
  .get(getListings)
  .post(protect, authorize('donor', 'ngo'), createListing);

router.get('/my/all', protect, getMyListings);

router.route('/:id')
  .get(getListing)
  .put(protect, updateListing)
  .delete(protect, deleteListing);

router.post('/:id/images', protect, upload.array('images', 5), uploadImages);
router.post('/:id/claim', protect, claimListing);

module.exports = router;