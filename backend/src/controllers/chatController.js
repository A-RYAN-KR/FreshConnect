const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel"); // Assuming you have a User model

// @desc    Get or create a one-on-one conversation
// @route   POST /api/chat
exports.accessOrCreateConversation = async (req, res) => {
  const { recipientId } = req.body;

  if (!recipientId) {
    return res.status(400).send({ message: "Recipient ID is required" });
  }

  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [req.user.id, recipientId] },
    })
      .populate("participants", "-password")
      .populate("lastMessage");

    if (conversation) {
      return res.status(200).json(conversation);
    }

    // If no conversation exists, create a new one
    const newConversation = new Conversation({
      participants: [req.user.id, recipientId],
    });

    const savedConversation = await newConversation.save();
    const fullConversation = await Conversation.findById(
      savedConversation._id
    ).populate("participants", "-password");

    res.status(201).json(fullConversation);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get all conversations for a user
// @route   GET /api/chat
exports.getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ participants: req.user.id })
      .populate({
        path: "participants",
        select: "firstName lastName name",
      })
      .populate({
        path: "lastMessage",
        populate: {
          path: "sender",
          select: "firstName lastName name",
        },
      })
      .sort({ updatedAt: -1 });

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get all messages for a conversation
// @route   GET /api/chat/:conversationId/messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    })
      .populate("sender", "name")
      .sort({ createdAt: "asc" });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};