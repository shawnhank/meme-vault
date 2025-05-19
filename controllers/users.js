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

module.exports = {
  showProfile,
  listUsers,
};