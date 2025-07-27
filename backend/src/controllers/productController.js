const Product = require('../models/productModel');
const User = require('../models/userModel'); // Make sure this path is correct

// A helper object for population options to avoid repetition
const supplierPopulationOptions = {
  path: 'supplierId',
  select: 'firstName lastName trustScore avatar' // Select only the fields you need
};

// --- This function is untouched but included for completeness ---
exports.createProduct = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No image file provided" });
    }

    const imageUrls = req.files.map((file) => file.path);
    const supplierId = req.user.id;
    const { name, description, price, bulkPrice, category, stockQuantity } = req.body;

    const product = new Product({
      supplierId,
      name,
      description,
      price,
      bulkPrice,
      images: imageUrls,
      category,
      stockQuantity,
    });

    await product.save();

    // To be consistent, populate the new product before sending it back
    const populatedProduct = await product.populate(supplierPopulationOptions);

    res.status(201).json({ success: true, product: populatedProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};

// --- MODIFIED FUNCTION ---
exports.getAllProducts = async (req, res) => {
  try {
    // We now chain .populate() to the find() query.
    // This tells Mongoose to fetch the related User document for each product.
    const products = await Product.find({})
      .populate(supplierPopulationOptions)
      .sort({ createdAt: -1 }); // Optional: sort by newest first

    // The 'products' array now contains full product objects,
    // where 'supplierId' is replaced by the populated supplier document.
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ success: false, message: 'Failed to get products', error: error.message });
  }
};

// --- MODIFIED FUNCTION ---
exports.getProductById = async (req, res) => {
  try {
    // We also populate the data when fetching a single product.
    const product = await Product.findById(req.params.id)
      .populate(supplierPopulationOptions);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({ success: false, message: 'Failed to get product', error: error.message });
  }
};

// --- MODIFIED FUNCTION ---
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    let product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (product.supplierId.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this product",
      });
    }

    // Manually build the update object to avoid overwriting fields unintentionally
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      bulkPrice: req.body.bulkPrice,
      stockQuantity: req.body.stockQuantity,
      category: req.body.category,
    };
    
    // If new images are being uploaded, add them to the update object
    if(req.files && req.files.length > 0) {
      updateData.images = req.files.map(file => file.path);
    }

    // Find, update, and then populate the result before sending it back
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate(supplierPopulationOptions);

    res.status(200).json({ success: true, product: updatedProduct });
  } catch (error)
  {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

// --- This function is untouched but included for completeness ---
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.supplierId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: 'You are not authorized to delete this product' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: 'Failed to delete product', error: error.message });
  }
};