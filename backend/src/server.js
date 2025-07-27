// server.js

// --- Imports ---
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = require("./app"); // Import your configured Express app
const connectDB = require("./config/db");
const Message = require("./models/messageModel"); // Import models used in socket logic
const Conversation = require("./models/conversationModel");

// --- Initial Setup ---
const port = process.env.PORT || 5000;
connectDB(); // Connect to MongoDB

// --- Create HTTP Server & Attach Socket.IO ---
// This is the single source of truth for your server.
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080", // IMPORTANT: Make sure this matches your frontend port. The image showed 8080, but React dev server is usually 3000.
    methods: ["GET", "POST"],
  },
});

// --- Socket.IO Logic ---
const userSocketMap = {}; // { userId: socketId }

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // 1. Associate userId with socketId upon connection
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`User ${userId} connected.`);
  }

  // 2. Join a specific chat room (conversation)
  socket.on("join_room", (conversationId) => {
    socket.join(conversationId);
    console.log(`User ${userId} joined room: ${conversationId}`);
  });

  // 3. Handle sending a new message
  socket.on("send_message", async (data) => {
    const { conversationId, senderId, content } = data;

    try {
      const newMessage = new Message({
        conversationId,
        sender: senderId,
        content,
      });
      await newMessage.save();
      await Conversation.findByIdAndUpdate(conversationId, {
        lastMessage: newMessage._id,
      });

      const fullMessage = await Message.findById(newMessage._id).populate(
        "sender",
        "name"
      );
      io.in(conversationId).emit("receive_message", fullMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  // 4. Handle disconnection
  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
    for (const [id, socketId] of Object.entries(userSocketMap)) {
      if (socketId === socket.id) {
        delete userSocketMap[id];
        break;
      }
    }
  });
});

// --- Start the Server ---
// FIX: Only start the `server` instance, not the `app` instance.
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});