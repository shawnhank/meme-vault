const User = require('../models/user');
const Meme = require('../models/meme');
const Favorite = require('../models/favorite');

async function showProfile(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      req.flash('error', 'User not found.');
      return res.redirect('/');
    }
    const memes = await Meme.find({ createdBy: user._id }).lean();
    const userMemesWithCounts = await Promise.all(
      memes.map(async (meme) => {
        const count = await Favorite.countDocuments({ meme: meme._id });
        return { ...meme, favoriteCount: count };
      })
    );
    const rawFavorites = await Favorite.find({ user: user._id }).populate(
      'meme'
    );
    const favoritesWithCounts = await Promise.all(
      rawFavorites.map(async (fav) => {
        const meme = fav.meme;
        if (!meme) return null;
        const count = await Favorite.countDocuments({ meme: meme._id });
        return { ...meme.toObject(), favoriteCount: count };
      })
    );
    const validFavorites = favoritesWithCounts.filter(Boolean);
    res.render('users/show', {
      user,
      userMemes: userMemesWithCounts,
      favorites: validFavorites,
    });
  } catch (err) {
    console.error('Error in showProfile:', err);
    req.flash('error', 'Could not load user profile.');
    res.redirect('/');
  }
}

async function listUsers(req, res) {
  try {
    const users = await User.find();
    res.render('users/community', { users });
  } catch (err) {
    console.log(err);
    req.flash('error', 'Could not load user list.');
    res.redirect('/');
  }
}

async function editProfileForm(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (
      !user ||
      !req.session.user ||
      user._id.toString() !== req.session.user._id.toString()
    ) {
      req.flash('error', 'Not authorized.');
      return res.redirect('/');
    }
    res.render('users/form', { user, isNew: false });
  } catch (err) {
    console.log(err);
    req.flash('error', 'Failed to load edit form.');
    res.redirect('/');
  }
}

async function updateProfile(req, res) {
  function isValidUrl(value) {
    return (
      typeof value === 'string' &&
      /^https?:\/\/[\w.-]+\.[a-z]{2,}([^\s]*)?$/i.test(value.trim())
    );
  }
  const errors = [];
  const { instagram, twitter, facebook, linkedin } = req.body;
  if (instagram && !isValidUrl(instagram)) {
    errors.push('Instagram URL is invalid.');
  }
  if (twitter && !isValidUrl(twitter)) {
    errors.push('Twitter URL is invalid.');
  }
  if (facebook && !isValidUrl(facebook)) {
    errors.push('Facebook URL is invalid.');
  }
  if (linkedin && !isValidUrl(linkedin)) {
    errors.push('LinkedIn URL is invalid.');
  }
  if (errors.length > 0) {
    req.flash('error', errors.join(' '));
    return res.redirect(`/users/${req.params.id}/edit`);
  }
  try {
    const user = await User.findById(req.params.id);
    if (
      !user ||
      !req.session.user ||
      user._id.toString() !== req.session.user._id.toString()
    ) {
      req.flash('error', 'Not authorized.');
      return res.redirect('/');
    }
    user.name = req.body.name;
    user.email = req.body.email;
    user.bio = req.body.bio;
    user.avatarSeed = req.body.avatarSeed;
    user.social = {
      instagram: instagram.trim(),
      twitter: twitter.trim(),
      facebook: facebook.trim(),
      linkedin: linkedin.trim(),
    };
    await user.save();
    req.session.user.avatarSeed = user.avatarSeed;
    req.session.user.name = user.name;
    req.session.user.email = user.email;
    req.flash('success', 'Profile updated successfully.');
    res.redirect(`/users/${user._id}`);
  } catch (err) {
    console.log(err);
    req.flash('error', 'Profile update failed.');
    res.redirect(`/users/${req.params.id}/edit`);
  }
}

async function showChangePasswordForm(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (
      !user ||
      !req.session.user ||
      user._id.toString() !== req.session.user._id.toString()
    ) {
      req.flash('error', 'Not authorized.');
      return res.redirect('/');
    }
    res.render('users/change-password', { user });
  } catch (err) {
    console.log(err);
    req.flash('error', 'Could not load password form.');
    res.redirect('/');
  }
}

async function updatePassword(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (
      !user ||
      !req.session.user ||
      user._id.toString() !== req.session.user._id.toString()
    ) {
      req.flash('error', 'Not authorized.');
      return res.redirect('/');
    }
    const { password, confirm } = req.body;
    if (!password || !confirm || password !== confirm) {
      req.flash('error', 'Passwords do not match.');
      return res.redirect(`/users/${user._id}/change-password`);
    }
    user.password = password;
    await user.save();
    req.flash('success', 'Password updated successfully.');
    res.redirect(`/users/${user._id}`);
  } catch (err) {
    console.log(err);
    req.flash('error', 'Failed to update password.');
    res.redirect(`/users/${req.params.id}/change-password`);
  }
}

module.exports = {
  showProfile,
  listUsers,
  editProfileForm,
  updateProfile,
  showChangePasswordForm,
  updatePassword,
};
