const express = require('express');
const router = express.Router();
const Meme = require('../models/meme');
const Tag = require('../models/tag');
const User = require('../models/user');

// GET /search?q=...
router.get('/', async (req, res) => {
  const query = req.query.q?.trim();
  if (!query) return res.redirect('/memes');

  const regex = new RegExp(query, 'i');

  const matchedUsers = await User.find({ name: regex });
  const matchedUserIds = matchedUsers.map(u => u._id);

  const matchedTags = await Tag.find({ name: regex });
  const matchedTagIds = matchedTags.map(t => t._id);

  const memes = await Meme.find({
    $or: [
      { name: regex },
      { description: regex },
      { createdBy: { $in: matchedUserIds } },
      { tags: { $in: matchedTagIds } }
    ]
  }).populate('createdBy').populate('tags');

  res.render('search/index', { query, memes });
});

module.exports = router;