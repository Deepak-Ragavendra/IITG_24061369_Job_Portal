const express = require('express');
const router = express.Router();
const Job = require('../models/Job');             // Make sure path & model names match yours
const Candidate = require('../models/Candidate');

// Search Jobs API with filters + pagination
router.get('/jobs', async (req, res) => {
  try {
    const { title, location, skills, salaryMin, salaryMax, page = 1, limit = 10, sort } = req.query;
    const query = {};

    if (title) query.jobTitle = { $regex: title, $options: 'i' };
    if (location) query.location = { $regex: location, $options: 'i' };
    if (skills) {
      const skillsArr = skills.split(',').map(s => s.trim());
      query.skills = { $in: skillsArr };
    }
    if (salaryMin || salaryMax) {
      query.salary = {};
      if (salaryMin) query.salary.$gte = Number(salaryMin);
      if (salaryMax) query.salary.$lte = Number(salaryMax);
    }

    const jobs = await Job.find(query)
      .sort(sort || 'jobTitle')
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Job.countDocuments(query);

    res.json({ jobs, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Search Candidates API with filters + pagination
router.get('/candidates', async (req, res) => {
  try {
    const { skills, experience, keywords, page = 1, limit = 10, sort } = req.query;
    const query = {};

    if (skills) {
      const skillsArr = skills.split(',').map(s => s.trim());
      query.skills = { $in: skillsArr };
    }
    if (experience) {
      query.experience = { $gte: Number(experience) };
    }
    if (keywords) {
      query.$or = [
        { name: { $regex: keywords, $options: 'i' } },
        { education: { $regex: keywords, $options: 'i' } },
        { skills: { $regex: keywords, $options: 'i' } }
      ];
    }

    const candidates = await Candidate.find(query)
      .sort(sort || 'name')
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Candidate.countDocuments(query);

    res.json({ candidates, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
