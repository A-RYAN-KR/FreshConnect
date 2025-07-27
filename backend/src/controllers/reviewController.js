const Review = require('../models/reviewModel');
const Product = require('../models/productModel');

exports.createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.id;
    const vendorId = req.user.id;

    console.log("productId:", productId); // Add this line for debugging

    const review = new Review({
      productId,
      vendorId,
      rating,
      comment,
      reviewImages: [req.cloudinaryUrl] // Assuming you're using uploadMiddleware here too
    });

    await review.save();

    res.status(201).json({ success: true, review });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ success: false, message: 'Failed to create review', error: error.message });
  }
};

exports.getReviewsByProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const reviews = await Review.find({ productId });
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.error('Error getting reviews:', error);
    res.status(500).json({ success: false, message: 'Failed to get reviews', error: error.message });
  }
};