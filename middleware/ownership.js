const Meme = require('../models/meme');

async function isOwner(req, res, next) {
  try {
    const meme = await Meme.findById(req.params.id);

    if (!meme) {
      req.flash('error', 'Meme not found.');
      return res.redirect('/memes');
    }

    if (!meme.createdBy.equals(req.session.user._id)) {
      req.flash('error', 'Not authorized.');
      return res.redirect('/memes');
    }

    next();
  } catch (err) {
    req.flash('error', 'Permission check failed.');
    res.redirect('/memes');
  }
}

module.exports = { isOwner };
