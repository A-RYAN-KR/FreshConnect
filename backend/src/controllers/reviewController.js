const calculateTrustScore = require("../utils/trustScore");
const Review = require("../models/reviewModel");
const Product = require("../models/productModel");

exports.createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.productId;
    const vendorId = req.user.id;
    const reviewImages = req.files ? req.files.map((file) => file.path) : [];

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is missing." });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // This is the product's supplier ID we need to save!
    const supplierId = product.supplierId;

    const review = new Review({
      productId,
      vendorId,
      supplierId,
      rating,
      comment,
      reviewImages,
    });

    await review.save();

    // Now this call will work because the review is linked to the supplier
    await calculateTrustScore(supplierId);

    res.status(201).json({ success: true, review });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create review",
      error: error.message,
    });
  }
};

exports.getReviewsByProduct = async (req, res) => {
  try {
    // FIX 3 (Consistency): Use productId here as well for clarity.
    const productId = req.params.productId;
    const reviews = await Review.find({ productId }).populate(
      "vendorId",
      "name"
    ); // Optional: populate vendor info
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get reviews",
      error: error.message,
    });

  }
};
