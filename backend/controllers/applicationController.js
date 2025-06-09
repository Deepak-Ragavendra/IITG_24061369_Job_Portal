import Application from '../models/Application.js';

export const applyToJob = async (req, res) => {
  const application = new Application(req.body);
  await application.save();
  res.status(201).json(application);
};

export const getApplications = async (req, res) => {
  const applications = await Application.find().populate('jobId candidateId');
  res.json(applications);
};
