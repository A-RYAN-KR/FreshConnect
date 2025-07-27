// src/controller/userController.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const calculateTrustScore  = require("../utils/trustScore");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);
  const userResponse = user.toObject();
  delete userResponse.password;

  res.status(statusCode).json({
    success: true,
    token,
    user: userResponse,
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, userType, address } =
      req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      userType,
      address,
    });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
exports.getMe = async (req, res, next) => {
  // The 'protect' middleware already attaches the user to req.user
  res.status(200).json({
    success: true,
    data: req.user,
  });
};

// @desc    Get all users with the role 'supplier' and their products
// @route   GET /api/users/suppliers
exports.getAllSuppliers = async (req, res, next) => {
  try {
    // We use an aggregation pipeline to efficiently fetch suppliers and their associated products.
    const suppliers = await User.aggregate([
      // Stage 1: Filter to get only users who are suppliers
      {
        $match: { userType: "supplier" },
      },
      // Stage 2: Perform a "left join" to the 'products' collection
      {
        $lookup: {
          from: "products", // The name of the products collection in MongoDB
          localField: "_id", // The field from the User collection
          foreignField: "supplierId", // The field from the Product collection
          as: "products", // The name of the new array field to add to each supplier
        },
      },
      // Stage 3: (Optional but recommended) Add mock/calculated fields to match the frontend UI
      {
        $addFields: {
          // These are examples. You would calculate these based on real data (e.g., reviews, location).
          trustScore: {
            $floor: { $add: [90, { $multiply: [10, { $rand: {} }] }] },
          }, // Random trust score 90-99
          rating: {
            $round: [{ $add: [4.5, { $multiply: [0.5, { $rand: {} }] }] }, 1],
          }, // Random rating 4.5-5.0
          reviewCount: {
            $floor: { $add: [50, { $multiply: [150, { $rand: {} }] }] },
          }, // Random reviews 50-200
          distance: "2.5 km",
          deliveryTime: "2-4 hours",
          minOrder: 500,
        },
      },
      // Stage 4: Reshape the output to remove sensitive data like passwords
      {
        $project: {
          _id: 1,
          name: { $concat: ["$firstName", " ", "$lastName"] }, // Combine first and last name
          email: 1,
          address: 1,
          products: 1, // Include the array of products
          // Include the new fields
          trustScore: 1,
          rating: 1,
          reviewCount: 1,
          distance: 1,
          deliveryTime: 1,
          minOrder: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      count: suppliers.length,
      suppliers: suppliers,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
