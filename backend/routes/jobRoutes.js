const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// POST a new job
router.post("/", async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all jobs
router.get('/', async (req, res) => {
  const { title, location, skills } = req.query;
  const query = {};

  if (title) query.title = { $regex: title, $options: 'i' }; // case-insensitive
  if (location) query.location = { $regex: location, $options: 'i' };
  if (skills) query.requirements = { $in: [ new RegExp(skills, 'i') ] };

  try {
    const jobs = await Job.find(query);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


// GET single job by ID
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    res.json(job);
  } catch (err) {
    res.status(404).json({ error: "Job not found" });
  }
});

// PUT update job
// PUT /api/jobs/:id -> update a job
router.put('/:id', async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update job' });
  }
});



// DELETE /api/jobs/:id -> delete a job
router.delete('/:id', async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete job' });
  }
});


module.exports = router;
