const Meme = require('../models/meme');
const Tag = require('../models/tag');
const Favorite = require('../models/favorite');

async function index(req, res) {
  try {
    const memes = await Meme.find().lean();
    const memeData = await Promise.all(
      memes.map(async (meme) => {
        const count = await Favorite.countDocuments({ meme: meme._id });
        return { ...meme, favoriteCount: count };
      })
    );
    res.render('memes/index', {
      memes: memeData,
      mine: false,
      query: req.query,
    });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not load memes.');
    res.redirect('/');
  }
}

async function myMemes(req, res) {
  try {
    const memes = await Meme.find({ createdBy: req.session.user._id }).lean();
    const memeData = await Promise.all(
      memes.map(async (meme) => {
        const count = await Favorite.countDocuments({ meme: meme._id });
        return { ...meme, favoriteCount: count };
      })
    );

    res.render('memes/index', { memes: memeData, mine: true });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not load your memes.');
    res.redirect('/');
  }
}

function newForm(req, res) {
  if (!req.session.user) {
    req.flash('error', 'Please sign up / create an account to add memes.');
    return res.redirect('/register');
  }

  res.render('memes/new', { meme: {} });
}

async function create(req, res) {
  try {
    const user = req.session.user;

    const images = Array.isArray(req.body.images)
      ? req.body.images.filter((url) => url.trim() !== '')
      : req.body.images
      ? [req.body.images]
      : [];

    let submittedTags = req.body.tags || '';
    let tagNames = submittedTags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    tagNames = tagNames.map(
      (tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()
    );

    tagNames = [...new Set(tagNames)];

    const tagIds = [];
    for (const tagName of tagNames) {
      let tag = await Tag.findOne({ name: tagName });
      if (!tag) {
        tag = await Tag.create({ name: tagName });
      }
      tagIds.push(tag._id);
    }

    await Meme.create({
      name: req.body.name,
      description: req.body.description,
      images: images,
      createdBy: user._id,
      tags: tagIds,
    });

    req.flash('success', 'Meme created successfully.');
    res.redirect('/memes');
  } catch (err) {
    req.flash('error', 'Failed to create meme.');
    res.redirect('/memes/new');
  }
}

async function show(req, res) {
  try {
    const meme = await Meme.findById(req.params.id)
      .populate('createdBy')
      .populate('tags');

    const favoriteCount = await Favorite.countDocuments({ meme: meme._id });

    let isFavorited = false;
    if (req.session.user) {
      isFavorited = await Favorite.exists({
        user: req.session.user._id,
        meme: meme._id,
      });
    }

    res.render('memes/show', {
      meme,
      favoriteCount,
      isFavorited
    });
  } catch (err) {
    req.flash('error', 'Could not load meme.');
    res.redirect('/memes');
  }
}

async function editForm(req, res) {
  const meme = await Meme.findById(req.params.id).populate('tags');

  if (meme.tags && meme.tags.length) {
    meme.tagsFormatted = meme.tags.map((tag) => tag.name).join(', ');
  }

  res.render('memes/edit', { meme });
}

async function update(req, res) {
  try {
    const images = Array.isArray(req.body.images)
      ? req.body.images.filter((url) => url.trim() !== '')
      : req.body.images
      ? [req.body.images]
      : [];

    let submittedTags = req.body.tags || '';
    let tagNames = submittedTags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    tagNames = tagNames.map(
      (tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()
    );

    tagNames = [...new Set(tagNames)];

    const tagIds = [];
    for (const tagName of tagNames) {
      let tag = await Tag.findOne({ name: tagName });
      if (!tag) {
        tag = await Tag.create({ name: tagName });
      }
      tagIds.push(tag._id);
    }

    await Meme.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      description: req.body.description,
      images: images,
      tags: tagIds,
    });

    req.flash('success', 'Meme updated successfully.');
    res.redirect(`/memes/${req.params.id}`);
  } catch (err) {
    req.flash('error', 'Failed to update meme.');
    res.redirect(`/memes/${req.params.id}/edit`);
  }
}
async function destroy(req, res) {
  await Meme.findByIdAndDelete(req.params.id);
  req.flash('success', 'Meme deleted successfully.');
  res.redirect('/memes');
}

module.exports = {
  index,
  myMemes,
  newForm,
  create,
  show,
  editForm,
  update,
  destroy,
};
