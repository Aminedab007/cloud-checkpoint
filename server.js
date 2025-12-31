// server.js
// Cloud Checkpoint - MERN (Backend ready for Azure)
// - Express server
// - MongoDB connection (Atlas or local) via MONGO_URI
// - Dynamic port using process.env.PORT (required for Azure)

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json()); // to read JSON body

// ✅ Required for Azure: do NOT hardcode the port
const PORT = process.env.PORT || 5000;

// ✅ MongoDB connection (Atlas recommended)
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing. Add it in .env (local) or Azure App Settings (prod).");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// Simple test route (API)
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "API is running",
    env: process.env.NODE_ENV || "development",
  });
});

// Root route (just to confirm server works)
app.get("/", (req, res) => {
  res.send("✅ Server is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
