const express = require('express');
const router = express.Router();
const Meme = require('../models/meme');
const Tag = require('../models/tag');
const User = require('../models/user');

// GET /search?q=...
router.get('/', async (req, res) => {
  const query = req.query.q?.trim();
  if (!query) return res.redirect('/memes');

  const regex = new RegExp(query, 'i');     // case-insensitive partial match

  // Match users by name, username, or email
   const matchedUsers = await User.find({
    $or: [
      { name: regex },
      { username: regex },
      { email: regex }
    ]
  });
  const matchedUserIds = matchedUsers.map(u => u._id);

  // Match tags
  const matchedTags = await Tag.find({ name: regex });
  const matchedTagIds = matchedTags.map(t => t._id);

  // Find memes that match title, description, creator, or tag
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