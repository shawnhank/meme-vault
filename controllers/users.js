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

module.exports = { showProfile };