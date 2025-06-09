import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  skills: { type: String },
  education: { type: String },
  experience: { type: String }
});

const Candidate = mongoose.model("Candidate", candidateSchema);
export default Candidate;
