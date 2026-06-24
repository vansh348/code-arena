const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  problemTitle: { type: String },
  code: { type: String, required: true },
  language: { type: String, enum: ['javascript', 'python', 'java'], required: true },
  status: {
    type: String,
    enum: ['Accepted', 'Wrong Answer', 'Runtime Error', 'Compilation Error', 'Time Limit Exceeded'],
    required: true
  },
  runtime: { type: String },
  memory: { type: String },
  passedCases: { type: Number, default: 0 },
  totalCases: { type: Number, default: 0 },
  contestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contest', default: null },
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);
