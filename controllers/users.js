const User = require('../models/user');     // Import User model
const Meme = require('../models/meme');     // Import Meme model
const Favorite = require('../models/favorite');  // Import Favorite model


// GET /users/:id → Show user profile with their memes
async function showProfile(req, res) {
  try {
    const userId = req.params.id;

    //null check
    const user = await User.findById(userId);
    if (!user) {
     req.flash('error', 'User not found.');
      return res.redirect('/');
    }

    // Get all memes created by this user and attach favoriteCount
    const memes = await Meme.find({ createdBy: user._id }).lean();
    const userMemesWithCounts = await Promise.all(memes.map(async meme => {
      const count = await Favorite.countDocuments({ meme: meme._id });
      return { ...meme, favoriteCount: count };
    }));

    // Get all memes the user has favorited
    const rawFavorites = await Favorite.find({ user: user._id }).populate('meme');

    // Extract meme objects and attach favoriteCount to each
    const favoritesWithCounts = await Promise.all(
      rawFavorites.map(async fav => {
        const meme = fav.meme;
        if (!meme) return null; // Skip if meme was deleted
        const count = await Favorite.countDocuments({ meme: meme._id });
        return { ...meme.toObject(), favoriteCount: count };
      })
    );

    // Filter out any nulls (from deleted memes)
    const validFavorites = favoritesWithCounts.filter(Boolean);

    

    res.render('users/show', {
      user,
      userMemes: userMemesWithCounts,
      favorites: validFavorites
    });

  } catch (err) {
    console.error('Error in showProfile:', err);
    req.flash('error', 'Could not load user profile.');
    res.redirect('/');
  }
}

// GET /community → Show list of all users
async function listUsers(req, res) {
  try {
    // Get all users from the database
    const users = await User.find();


    // Render the community view and pass all users
    res.render('users/community', { users });
  } catch (err) {
    console.log(err);
    req.flash('error', 'Could not load user list.');
    res.redirect('/');
  }
}

// GET /users/:id/edit → Show the profile edit form
async function editProfileForm(req, res) {
  try {
    const user = await User.findById(req.params.id);

    // Only allow if logged-in user is the profile owner
    if (!user || !req.session.user || user._id.toString() !== req.session.user._id.toString()) {
      req.flash('error', 'Not authorized.');
      return res.redirect('/');
    }

    // Render form view with pre-filled user info
    res.render('users/form', { user, isNew: false });
  } catch (err) {
    console.log(err);
    req.flash('error', 'Failed to load edit form.');
    res.redirect('/');
  }
}

// PUT /users/:id → Update profile info
async function updateProfile(req, res) {
  function isValidUrl(value) {
    return typeof value === 'string' && /^https?:\/\/[\w.-]+\.[a-z]{2,}([^\s]*)?$/i.test(value.trim());
  }

  const errors = [];
  const { instagram, twitter, facebook, linkedin } = req.body;

  // Validate social links if present
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

    // Ownership check
    if (!user || !req.session.user || user._id.toString() !== req.session.user._id.toString()) {
      req.flash('error', 'Not authorized.');
      return res.redirect('/');
    }

    // Update editable fields
    user.name = req.body.name;
    user.email = req.body.email;
    user.bio = req.body.bio;
    user.social = {
      instagram: instagram.trim(),
      twitter: twitter.trim(),
      facebook: facebook.trim(),
      linkedin: linkedin.trim()
    };


    await user.save();
    req.flash('success', 'Profile updated successfully.');
    res.redirect(`/users/${user._id}`);
  } catch (err) {
    console.log(err);
    req.flash('error', 'Profile update failed.');
    res.redirect(`/users/${req.params.id}/edit`);
  }
}

// GET /users/:id/change-password → Show the change password form
async function showChangePasswordForm(req, res) {
  try {
    // Find the user by their ID from the route
    const user = await User.findById(req.params.id);

    // Allow access only if the logged-in user matches the target user
    if (!user || !req.session.user || user._id.toString() !== req.session.user._id.toString()) {
      req.flash('error', 'Not authorized.');
      return res.redirect('/');
    }

    // Render the password change form view
    res.render('users/change-password', { user });
  } catch (err) {
    // If an error occurs, log it and flash a user-friendly message
    console.log(err);
    req.flash('error', 'Could not load password form.');
    res.redirect('/');
  }
}

// PUT /users/:id/change-password → Save new password
async function updatePassword(req, res) {
  try {
    const user = await User.findById(req.params.id);

    // Ownership check
    if (!user || !req.session.user || user._id.toString() !== req.session.user._id.toString()) {
      req.flash('error', 'Not authorized.');
      return res.redirect('/');
    }

    const { password, confirm } = req.body;

    // Validate password match
    if (!password || !confirm || password !== confirm) {
      req.flash('error', 'Passwords do not match.');
      return res.redirect(`/users/${user._id}/change-password`);
    }

    // Update and hash via schema .pre('save')
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
  updatePassword
};