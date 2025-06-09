const express = require("express");
const router = express.Router();
const { Application } = require("../models/Application");

// POST /api/applications - create new application
router.post("/", async (req, res) => {
  try {
    const newApplication = new Application(req.body);
    await newApplication.save();
    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error creating application:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("jobId")         // Populate job details
      .populate("candidateId");  // Populate candidate details
    res.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
