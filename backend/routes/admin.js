const express = require('express');
const User = require('../models/User');
const Problem = require('../models/Problem');
const Submission = require('../models/Submission');
const Contest = require('../models/Contest');
const { verifyToken, isAdmin } = require('../middleware/auth');

const router = express.Router();
router.use(verifyToken, isAdmin);

// GET /api/admin/stats
router.get('/stats', async (req, res) => {
  try {
    const [totalUsers, totalProblems, totalSubmissions, acceptedSubmissions, recentSubmissions] = await Promise.all([
      User.countDocuments(),
      Problem.countDocuments(),
      Submission.countDocuments(),
      Submission.countDocuments({ status: 'Accepted' }),
      Submission.find().sort({ createdAt: -1 }).limit(10)
        .populate('user', 'username')
        .populate('problem', 'title slug')
        .lean()
    ]);
    res.json({ totalUsers, totalProblems, totalSubmissions, acceptedSubmissions, recentSubmissions });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load stats.' });
  }
});

// GET /api/admin/users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 }).lean();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users.' });
  }
});

// PATCH /api/admin/users/:id/role
router.patch('/users/:id/role', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    if (user._id.toString() === req.user._id.toString())
      return res.status(400).json({ message: 'Cannot change your own role.' });
    user.role = user.role === 'admin' ? 'user' : 'admin';
    await user.save();
    const safe = user.toObject(); delete safe.password;
    res.json(safe);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update role.' });
  }
});

// DELETE /api/admin/users/:id
router.delete('/users/:id', async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString())
      return res.status(400).json({ message: 'Cannot delete your own account.' });
    await User.findByIdAndDelete(req.params.id);
    await Submission.deleteMany({ user: req.params.id });
    res.json({ message: 'User deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user.' });
  }
});

// POST /api/admin/problems
router.post('/problems', async (req, res) => {
  try {
    const { title, difficulty, tags, description, examples, constraints, hints, starterCode, testCases } = req.body;
    if (!title || !difficulty || !description)
      return res.status(400).json({ message: 'title, difficulty, and description are required.' });

    const slug = title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');

    const existing = await Problem.findOne({ slug });
    if (existing) return res.status(400).json({ message: 'A problem with that title already exists.' });

    const problem = await Problem.create({
      title, slug, difficulty,
      tags: Array.isArray(tags) ? tags : (tags || '').split(',').map(t => t.trim()).filter(Boolean),
      description,
      examples: examples || [],
      constraints: constraints || [],
      hints: hints || [],
      starterCode: starterCode || {
        javascript: `// Write your solution here\nfunction solution() {\n  \n}`,
        python: `# Write your solution here\ndef solution():\n    pass`,
        java: `// Write your solution here\nclass Solution {\n    public void solution() {\n        \n    }\n}`
      },
      testCases: testCases || [],
      createdBy: req.user._id
    });
    res.status(201).json(problem);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: Object.values(err.errors).map(e => e.message).join(', ') });
    }
    res.status(500).json({ message: 'Failed to create problem.' });
  }
});

// PUT /api/admin/problems/:id
router.put('/problems/:id', async (req, res) => {
  try {
    const problem = await Problem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!problem) return res.status(404).json({ message: 'Problem not found.' });
    res.json(problem);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update problem.' });
  }
});

// DELETE /api/admin/problems/:id
router.delete('/problems/:id', async (req, res) => {
  try {
    await Problem.findByIdAndDelete(req.params.id);
    await Submission.deleteMany({ problem: req.params.id });
    res.json({ message: 'Problem deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete problem.' });
  }
});

// POST /api/admin/contests
router.post('/contests', async (req, res) => {
  try {
    const { title, description, startTime, endTime, problems } = req.body;
    if (!title || !startTime || !endTime)
      return res.status(400).json({ message: 'title, startTime, and endTime are required.' });
    const contest = await Contest.create({ title, description, startTime, endTime, problems: problems || [], createdBy: req.user._id });
    res.status(201).json(contest);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create contest.' });
  }
});

// DELETE /api/admin/contests/:id
router.delete('/contests/:id', async (req, res) => {
  try {
    await Contest.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contest deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete contest.' });
  }
});

module.exports = router;
