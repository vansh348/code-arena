const express = require('express');
const User = require('../models/User');

const router = express.Router();

// GET /api/leaderboard
router.get('/', async (req, res) => {
  try {
    const { limit = 50, page = 1 } = req.query;
    const users = await User.find({ role: { $ne: 'admin' } })
      .select('username score solved streak contestScore createdAt')
      .sort({ score: -1, solved: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .lean();

    const ranked = users.map((u, i) => ({
      ...u,
      rank: (page - 1) * limit + i + 1,
      solved: u.solved?.length || 0,
    }));

    const total = await User.countDocuments({ role: { $ne: 'admin' } });
    res.json({ leaderboard: ranked, total });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch leaderboard.' });
  }
});

module.exports = router;
