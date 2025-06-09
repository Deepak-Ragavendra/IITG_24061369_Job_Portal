const express = require("express");
const router = express.Router();
const { Candidate } = require("../models/Candidate");

// @route   POST /api/candidates
// @desc    Add a new candidate
router.post("/", async (req, res) => {
  try {
    const newCandidate = new Candidate(req.body);
    await newCandidate.save();
    res.status(201).json({ message: "Candidate added successfully" });
  } catch (error) {
    console.error("Error adding candidate:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
