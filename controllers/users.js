const User = require('../models/user');     // Import User model
const Meme = require('../models/meme');     // Import Meme model

// GET /users/:id → Show user profile with their memes
async function showProfile(req, res) {
  try {
    const userId = req.params.id; // Extract user ID from route parameter

    // Look up the user by ID
    const user = await User.findById(userId);

    // Find all memes created by this user
    const memes = await Meme.find({ createdBy: user._id });

    // Render the profile view with user info + their memes
    res.render('users/show', { user, memes });
  } catch (err) {
    console.log(err);
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
      instagram: req.body.instagram,
      twitter: req.body.twitter,
      facebook: req.body.facebook,
      linkedin: req.body.linkedin
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

module.exports = {
  showProfile,
  listUsers,
  editProfileForm,
  updateProfile
};