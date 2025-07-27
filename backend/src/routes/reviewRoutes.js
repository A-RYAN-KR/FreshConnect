const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post(
  "/:productId",
  protect,
  upload.array("reviewImages", 5),
  reviewController.createReview
);

router.get('/:productId', reviewController.getReviewsByProduct);

module.exports = router;