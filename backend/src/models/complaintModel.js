const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    vendorId: {
      // The user who is filing the complaint
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    supplierId: {
      // The supplier the complaint is about
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reason: {
      type: String,
      required: [true, "A reason for the complaint is required."],
      enum: [
        "Product is rotten",
        "Received wrong item",
        "Damaged packaging",
        "Item missing",
        "Other",
      ],
    },
    comment: {
      type: String,
    },
    image: {
      // URL of the image, stored after upload/verification
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Verified", "Rejected", "Resolved"],
      default: "Pending",
    },
    isVerifiedByAI: {
      // To track the Gemini verification result
      type: Boolean,
      default: null, // null means not applicable or not yet checked
    },
  },
  { timestamps: true }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;