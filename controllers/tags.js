const Tag = require('../models/tag');
const Meme = require('../models/meme');

// GET /tags → list all tags
async function index(req, res) {
  const tags = await Tag.find({}).sort('name');
  res.render('tags/index', { tags });
}

// GET /tags/:name → show memes with a specific tag
async function show(req, res) {
  const tag = await Tag.findOne({ name: req.params.name });
  if (!tag) {
    req.flash('error', 'Tag not found.');
    return res.redirect('/tags');
  }

  const memes = await Meme.find({ tags: tag._id }).populate('createdBy');
  res.render('tags/show', { tag, memes });
}

module.exports = {
  index,
  show
};