const { calculateTrustScore } = require("../utils/trustScore");
const Product = require("../models/productModel");
const User = require("../models/userModel");

exports.createProduct = async (req, res) => {
  try {
    // 1. Check if files were uploaded by the middleware
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No image file provided" });
    }

    // 2. Extract the public URLs/paths of the uploaded images from req.files
    //    (The 'path' property is standard for multer-storage-cloudinary)
    const imageUrls = req.files.map((file) => file.path);

    const supplierId = req.user.id;
    const { name, description, price, bulkPrice, category, stockQuantity } =
      req.body;

    // 3. Create the new product with the image URLs
    const product = new Product({
      supplierId,
      name,
      description,
      price,
      bulkPrice,
      images: imageUrls, // <-- USE THE UPLOADED IMAGE URLS HERE
      category,
      stockQuantity,
    });

    await product.save();

    const supplierProductCount = await Product.countDocuments({ supplierId });

    if (supplierProductCount <= 25) {
      await calculateTrustScore(supplierId);
    }
    // Return the full product object, as the frontend expects it
    res.status(201).json(product); // <-- Send the product directly for simplicity
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get products",
      error: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get product",
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    let product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Authorization Check
    if (product.supplierId.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this product",
      });
    }

    // ✅ THE FIX: Manually build the update object from the request body.
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stockQuantity: req.body.stockQuantity,
      category: req.body.category,
    };

    // Note: This logic assumes you are not updating the images.
    // If you were, you would add logic here to check `req.files` and update `updateData.images`.

    // Use the manually constructed object for the update.
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updateData }, // Use $set to ensure only these fields are updated
      { new: true, runValidators: true } // `new: true` returns the updated doc, `runValidators` checks schema rules
    );

    await calculateTrustScore(req.user.id);

    res.status(200).json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Check if the user is the supplier of the product
    if (product.supplierId.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this product",
      });
    }

    await Product.findByIdAndDelete(req.params.id);
    await calculateTrustScore(req.user.id);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};
