// Load the Rating model
const Rating = require('../models/rating');

// POST /ratings/:id/ratings
// This function handles both creating a new rating and updating an existing one
async function createOrUpdate(req, res) {
  try {
    // Look for an existing rating by this user for this meme
    // If it exists, update it. If not, create it (upsert: true)
    await Rating.findOneAndUpdate(
      { 
        user: req.session.user._id,    // who is rating
        meme: req.params.id            // which meme
      },
      { 
        value: req.body.value          // rating value from form (1–5)
      },
      {
        upsert: true,                  // create if it doesn't exist
        new: true,                     // return the new document
        runValidators: true            // enforce schema rules (min/max)
      }
    );

    // Flash success message and redirect
    req.flash('success', 'Your rating has been saved.');
    res.redirect(`/memes/${req.params.id}`);

  } catch (err) {
    // If something fails (e.g., DB error), log it and flash an error message
    console.log(err);
    req.flash('error', 'Unable to save rating');
    res.redirect(`/memes/${req.params.id}`);
  }
}

// DELETE /ratings/:id/ratings
// This function removes a user's rating for a specific meme
async function remove(req, res) {
  try {
    // Find and delete the rating
    await Rating.findOneAndDelete({
      user: req.session.user._id,      // must match current logged-in user
      meme: req.params.id              // for the given meme
    });

   // Flash info message and redirect
  req.flash('info', 'Your rating has been removed.');
  res.redirect(`/memes/${req.params.id}`);

  } catch (err) {
    // If something fails, log and inform user
    console.log(err);
    req.flash('error', 'Unable to remove rating');
    res.redirect(`/memes/${req.params.id}`);
  }
}

// Export the controller functions
module.exports = { createOrUpdate, remove };