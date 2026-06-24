const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  input: { type: String, required: true },
  output: { type: String, required: true },
  explanation: { type: String, default: '' }
}, { _id: false });

const testCaseSchema = new mongoose.Schema({
  input: { type: mongoose.Schema.Types.Mixed, required: true },
  expected: { type: mongoose.Schema.Types.Mixed, required: true }
}, { _id: false });

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  tags: [{ type: String, trim: true }],
  description: { type: String, required: true },
  examples: [exampleSchema],
  constraints: [{ type: String }],
  hints: [{ type: String }],
  starterCode: {
    javascript: { type: String, default: '// Write your solution here\n' },
    python: { type: String, default: '# Write your solution here\n' },
    java: { type: String, default: '// Write your solution here\n' }
  },
  testCases: [testCaseSchema],
  acceptance: { type: Number, default: 0 },
  totalSubmissions: { type: Number, default: 0 },
  acceptedSubmissions: { type: Number, default: 0 },
  isPremium: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

// Recompute acceptance rate before saving
problemSchema.pre('save', function (next) {
  if (this.totalSubmissions > 0) {
    this.acceptance = Math.round((this.acceptedSubmissions / this.totalSubmissions) * 100);
  }
  next();
});

module.exports = mongoose.model('Problem', problemSchema);
