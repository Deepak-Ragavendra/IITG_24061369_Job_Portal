import Candidate from '../models/Candidate.js';

export const createCandidate = async (req, res) => {
  const candidate = new Candidate(req.body);
  await candidate.save();
  res.status(201).json(candidate);
};

export const getCandidates = async (req, res) => {
  const candidates = await Candidate.find();
  res.json(candidates);
};
