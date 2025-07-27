const express = require("express");
const router = express.Router();
const complaintController = require("../controllers/complaintController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); // Your existing multer/cloudinary middleware

// Route for creating a new complaint
router.post(
  "/",
  protect,
  upload.single("complaintImage"), // We only expect one image for a complaint
  complaintController.createComplaint
);

module.exports = router;