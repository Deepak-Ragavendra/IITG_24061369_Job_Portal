import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
  appliedAt: { type: Date, default: Date.now },
  status: { type: String, default: "applied" }
});

export default mongoose.model('Application', applicationSchema);
