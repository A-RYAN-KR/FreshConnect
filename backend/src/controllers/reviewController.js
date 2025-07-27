const { calculateTrustScore } = require("../utils/trustScore");
const Review = require("../models/reviewModel");
const Product = require("../models/productModel");

exports.createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    // FIX 1: Access the correct route parameter name
    const productId = req.params.productId;

    const vendorId = req.user.id; // Assuming `protect` middleware attaches user to req.user

    // FIX 2: Correctly handle multiple image uploads from req.files
    // The `upload.array` middleware puts uploaded file info into `req.files`.
    // We map over this array to get the path (or URL from Cloudinary) of each file.
    const reviewImages = req.files ? req.files.map((file) => file.path) : [];

    // Check if productId was found
    if (!productId) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Product ID is missing from the request URL.",
        });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    console.log("productId:", productId); // Add this line for debugging


    const review = new Review({
      productId,
      vendorId,
      rating,
      comment,
<<<<<<< Updated upstream
      reviewImages: [req.cloudinaryUrl], // Assuming you're using uploadMiddleware here too
=======
      reviewImages: reviewImages, // Use the array of image URLs
>>>>>>> Stashed changes
    });

    await review.save();

<<<<<<< Updated upstream
    await calculateTrustScore(product.supplierId);

    res.status(201).json({ success: true, review });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create review",
      error: error.message,
    });
    console.error('Error creating review:', error);
    res.status(500).json({ success: false, message: 'Failed to create review', error: error.message });
=======
    // It's good practice to send back the created document.
    res
      .status(201)
      .json({ success: true, message: "Review created successfully.", review });
  } catch (error) {
    // Provide a more detailed error log for yourself on the server
    console.error("Error creating review:", error);
    // Send a cleaner error message to the client
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to create review",
        error: error.message,
      });
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    res.status(500).json({
      success: false,
      message: "Failed to get reviews",
      error: error.message,
    });

=======
    console.error("Error fetching reviews:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to get reviews",
        error: error.message,
      });
>>>>>>> Stashed changes
  }
};
