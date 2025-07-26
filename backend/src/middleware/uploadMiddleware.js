// middleware/uploadMiddleware.js

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Configure Cloudinary (ensure .env variables are set)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer to use Cloudinary for storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products", // Folder name in your Cloudinary account
    allowed_formats: ["jpeg", "png", "jpg"],
  },
});

// Create the multer instance that will be used as middleware
const upload = multer({ storage: storage });

// Export the configured multer instance
module.exports = upload;