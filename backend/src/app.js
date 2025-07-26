// src/app.js
const express = require("express");
const cors = require("cors");
const authRoutes = require("./api/auth/auth.routes");

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Body parser for JSON

// API Routes
app.get("/", (req, res) => res.send("FreshConnect API is running..."));
app.use("/api/auth", authRoutes);

// Simple error handling (can be expanded)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;