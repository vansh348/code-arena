const express = require('express');
const Problem = require('../models/Problem');
const { verifyToken, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/problems
router.get('/', optionalAuth, async (req, res) => {
  try {
    let { difficulty, tag, search, page = 1, limit = 15, sort = 'createdAt' } = req.query;
    page = parseInt(page); limit = parseInt(limit);

    const filter = {};
    if (difficulty && difficulty !== 'All') filter.difficulty = difficulty;
    if (tag && tag !== 'All') filter.tags = tag;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const sortMap = {
      'acceptance': { acceptance: -1 },
      'difficulty': { difficulty: 1 },
      'submissions': { totalSubmissions: -1 },
      'newest': { createdAt: -1 },
      'oldest': { createdAt: 1 }
    };
    const sortObj = sortMap[sort] || { createdAt: 1 };

    const total = await Problem.countDocuments(filter);
    const problems = await Problem.find(filter)
      .select('title slug difficulty tags acceptance totalSubmissions createdAt')
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    res.json({ problems, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch problems.' });
  }
});

// GET /api/problems/:slug
router.get('/:slug', optionalAuth, async (req, res) => {
  try {
    const problem = await Problem.findOne({ slug: req.params.slug })
      .populate('createdBy', 'username')
      .lean();
    if (!problem) return res.status(404).json({ message: 'Problem not found.' });

    // Hide expected answers from testCases, expose only input
    const safeProblem = {
      ...problem,
      testCases: problem.testCases.map(tc => ({ input: tc.input }))
    };
    res.json(safeProblem);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch problem.' });
  }
});

module.exports = router;
