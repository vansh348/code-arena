const express = require('express');
const Problem = require('../models/Problem');
const Submission = require('../models/Submission');
const User = require('../models/User');
const { judgeCode } = require('../utils/judge');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// POST /api/submissions  — submit a solution
router.post('/', verifyToken, async (req, res) => {
  try {
    const { problemId, code, language } = req.body;
    if (!problemId || !code || !language)
      return res.status(400).json({ message: 'problemId, code, and language are required.' });

    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ message: 'Problem not found.' });

    // Notify client that judging started (via Socket.IO if available)
    if (req.app.io) {
      req.app.io.to(`user:${req.user._id}`).emit('judging_started', { problemId });
    }

    // Run judge (wrapped in setTimeout to not block event loop)
    await new Promise(resolve => setTimeout(resolve, 800)); // simulate realistic latency

    const result = judgeCode(code, language, problem.testCases, problem.difficulty);

    // Create submission record
    const submission = await Submission.create({
      user: req.user._id,
      problem: problem._id,
      problemTitle: problem.title,
      code,
      language,
      status: result.status,
      runtime: result.runtime,
      memory: result.memory,
      passedCases: result.passedCases,
      totalCases: result.totalCases,
    });

    // Update problem stats
    problem.totalSubmissions += 1;
    if (result.status === 'Accepted') problem.acceptedSubmissions += 1;
    await problem.save();

    // Update user if newly accepted
    if (result.status === 'Accepted') {
      const user = await User.findById(req.user._id);
      const problemIdStr = problem._id.toString();
      if (!user.solved.includes(problemIdStr)) {
        user.solved.push(problemIdStr);
        const points = { Easy: 50, Medium: 100, Hard: 200 }[problem.difficulty] || 50;
        user.score += points;

        // Update streak
        const today = new Date().toDateString();
        const lastSolved = user.lastSolvedDate ? new Date(user.lastSolvedDate).toDateString() : null;
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (lastSolved === yesterday) user.streak += 1;
        else if (lastSolved !== today) user.streak = 1;
        user.lastSolvedDate = new Date();

        await user.save();
      }
    }

    // Emit result via Socket.IO
    if (req.app.io) {
      req.app.io.to(`user:${req.user._id}`).emit('submission_result', {
        submissionId: submission._id,
        status: result.status,
      });
    }

    res.json({ submission, result });
  } catch (err) {
    console.error('Submission error:', err);
    res.status(500).json({ message: 'Judge failed. Please try again.' });
  }
});

// GET /api/submissions/my  — current user's submissions
router.get('/my', verifyToken, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const subs = await Submission.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('problem', 'title slug difficulty')
      .lean();
    const total = await Submission.countDocuments({ user: req.user._id });
    res.json({ submissions: subs, total });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch submissions.' });
  }
});

// GET /api/submissions/problem/:problemId  — user's submissions for a specific problem
router.get('/problem/:problemId', verifyToken, async (req, res) => {
  try {
    const subs = await Submission.find({
      problem: req.params.problemId,
      user: req.user._id
    }).sort({ createdAt: -1 }).lean();
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch submissions.' });
  }
});

module.exports = router;
