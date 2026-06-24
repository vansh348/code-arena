const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  problems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
  participants: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    score: { type: Number, default: 0 },
    solvedProblems: [{ type: String }],
    finishTime: { type: Date }
  }],
  status: { type: String, enum: ['upcoming', 'active', 'ended'], default: 'upcoming' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// Auto-set status based on time
contestSchema.methods.updateStatus = function () {
  const now = new Date();
  if (now < this.startTime) this.status = 'upcoming';
  else if (now >= this.startTime && now <= this.endTime) this.status = 'active';
  else this.status = 'ended';
};

module.exports = mongoose.model('Contest', contestSchema);
