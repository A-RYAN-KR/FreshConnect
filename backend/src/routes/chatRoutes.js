const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const { protect } = require("../middleware/authMiddleware");

// Get or create a conversation with a specific user
router.post("/", protect, chatController.accessOrCreateConversation);

// Get all conversations for the logged-in user
router.get("/", protect, chatController.getConversations);

// Get all messages for a specific conversation
router.get("/:conversationId/messages", protect, chatController.getMessages);

module.exports = router;