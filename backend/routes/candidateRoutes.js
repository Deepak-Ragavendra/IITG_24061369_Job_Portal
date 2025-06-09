// candidateRoutes.js
import express from "express";
import Candidate from "../models/Candidate.js";

const router = express.Router();

// @route   POST /api/candidates
router.post("/", async (req, res) => {
  try {
    const newCandidate = new Candidate(req.body);
    await newCandidate.save();
    res.status(201).json({ message: "Candidate added successfully" });
  } catch (error) {
    console.error("Error adding candidate:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// @route   GET /api/candidates
router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    console.error("Error fetching candidates:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
