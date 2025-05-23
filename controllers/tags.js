const Tag = require('../models/tag');
const Meme = require('../models/meme');

async function index(req, res) {
  const tags = await Tag.find({}).sort('name');
  res.render('tags/index', { tags });
}

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
  show,
};
