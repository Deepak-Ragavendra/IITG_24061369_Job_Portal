// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // To load MONGO_URI from .env

const app = express();

// Middleware
app.use(cors()); // Enable CORS if frontend runs on different port
app.use(express.json()); // To parse JSON bodies

// Import routes
const jobRoutes = require("./routes/jobRoutes");

// Use routes
app.use("/api/jobs", jobRoutes);

// Simple test route
app.get("/test", (req, res) => {
  res.send("Test route working!");
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
