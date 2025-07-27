const Complaint = require("../models/complaintModel");
const { verifyRottenImage } = require("../services/geminiService");

exports.createComplaint = async (req, res) => {
  try {
    const { orderId, productId, supplierId, reason, comment } = req.body;
    const vendorId = req.user.id;

    let imageUrl = null;
    let isVerifiedByAI = null;

    if (reason === "Product is rotten") {
      if (!req.file) {
        return res
          .status(400)
          .json({
            success: false,
            message: "An image is required for this complaint reason.",
          });
      }

      // FIX: Pass the image URL from Cloudinary (req.file.path) to the service
      const isVerified = await verifyRottenImage(req.file.path);

      isVerifiedByAI = isVerified;

      if (!isVerified) {
        return res.status(400).json({
          success: false,
          message:
            "AI verification failed. The image does not appear to show a rotten product. Please upload a clearer image or choose a different reason.",
        });
      }
      // The image URL is already in req.file.path, so we can assign it.
      imageUrl = req.file.path;
    }

    const complaint = new Complaint({
      orderId,
      productId,
      vendorId,
      supplierId,
      reason,
      comment,
      image: imageUrl,
      isVerifiedByAI,
      status: isVerifiedByAI === true ? "Verified" : "Pending",
    });

    await complaint.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Complaint filed successfully.",
        complaint,
      });
  } catch (error) {
    console.error("Error creating complaint:", error);
    res
      .status(500)
      .json({
        success: false,
        message: error.message || "Failed to file complaint.",
      });
  }
};