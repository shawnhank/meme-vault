// Import the Favorite model
const Favorite = require('../models/favorite');

// Add a meme to the current user's favorites
async function create(req, res) {
  try {
    // Use findOneAndUpdate to either find the favorite or create it if it doesn't exist
    await Favorite.findOneAndUpdate(
      {
        user: req.session.user._id,     // logged-in user ID
        meme: req.params.id             // ID of the meme being favorited
      },
      {},                               // no fields need updating — we just want it to exist
      {
        upsert: true,                   // create if it doesn’t exist
        new: true,                      // return the newly created or existing doc
        setDefaultsOnInsert: true       // apply schema defaults if inserting
      }
    );

    // Redirect back to the meme detail page
    res.redirect(`/memes/${req.params.id}`);

  } catch (err) {
    console.log(err); // log any errors
    res.redirect(`/memes/${req.params.id}`); // still redirect user back
  }
}

// Remove a meme from the current user's favorites
async function remove(req, res) {
  try {
    // Find the favorite record for this user and meme, and delete it
    await Favorite.findOneAndDelete({
      user: req.session.user._id,   // current logged-in user
      meme: req.params.id           // meme being unfavorited
    });

    // Redirect back to the meme detail page
    res.redirect(`/memes/${req.params.id}`);

  } catch (err) {
    console.log(err); // log any errors
    res.redirect(`/memes/${req.params.id}`); // still redirect user back
  }
}

// Show all memes that a user has favorited
async function index(req, res) {
  try {
    // Find all favorites for the given user ID and load the full meme data
    const favorites = await Favorite.find({ user: req.params.id }).populate('meme');

    // Render the favorites list page and pass the data to the view
    res.render('favorites/index', { favorites });

  } catch (err) {
    console.log(err); // log any errors
    res.redirect('/'); // fallback redirect if something goes wrong
  }
}

module.exports = {
  create,
  remove,
  index
};
