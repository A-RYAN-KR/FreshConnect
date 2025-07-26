const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.post('/:productId', protect, reviewController.createReview);
router.get('/:productId', reviewController.getReviewsByProduct);

module.exports = router;