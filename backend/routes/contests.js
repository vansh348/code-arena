const express = require('express');
const Contest = require('../models/Contest');
const Problem = require('../models/Problem');
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// GET /api/contests
router.get('/', async (req, res) => {
  try {
    const contests = await Contest.find()
      .populate('problems', 'title slug difficulty')
      .sort({ startTime: -1 })
      .lean();

    const now = new Date();
    const enriched = contests.map(c => ({
      ...c,
      status: now < new Date(c.startTime) ? 'upcoming'
        : now <= new Date(c.endTime) ? 'active' : 'ended',
      participantCount: c.participants?.length || 0,
    }));
    res.json(enriched);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch contests.' });
  }
});

// GET /api/contests/:id
router.get('/:id', async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id)
      .populate('problems', 'title slug difficulty tags acceptance totalSubmissions')
      .lean();
    if (!contest) return res.status(404).json({ message: 'Contest not found.' });

    const now = new Date();
    contest.status = now < new Date(contest.startTime) ? 'upcoming'
      : now <= new Date(contest.endTime) ? 'active' : 'ended';
    res.json(contest);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch contest.' });
  }
});

// POST /api/contests/:id/register
router.post('/:id/register', verifyToken, async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id);
    if (!contest) return res.status(404).json({ message: 'Contest not found.' });

    const already = contest.participants.find(p => p.user.toString() === req.user._id.toString());
    if (already) return res.status(400).json({ message: 'Already registered.' });

    contest.participants.push({ user: req.user._id, score: 0, solvedProblems: [] });
    await contest.save();

    await User.findByIdAndUpdate(req.user._id, { $inc: { contestsParticipated: 1 } });
    res.json({ message: 'Registered successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to register.' });
  }
});

// GET /api/contests/:id/standings
router.get('/:id/standings', async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id)
      .populate('participants.user', 'username')
      .lean();
    if (!contest) return res.status(404).json({ message: 'Contest not found.' });

    const standings = contest.participants
      .sort((a, b) => b.score - a.score || new Date(a.finishTime) - new Date(b.finishTime))
      .map((p, i) => ({
        rank: i + 1,
        username: p.user?.username || 'Unknown',
        score: p.score,
        solved: p.solvedProblems?.length || 0,
        finishTime: p.finishTime,
      }));

    res.json(standings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch standings.' });
  }
});

module.exports = router;
