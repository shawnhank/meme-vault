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
    const rawFavorites = await Favorite.find({ user: req.params.userId }).populate('meme');

    const favoritesWithCounts = await Promise.all(
      rawFavorites.map(async fav => {
        const meme = fav.meme;
        if (!meme) return null; // skip if meme was deleted
        const count = await Favorite.countDocuments({ meme: meme._id });
        return { ...meme.toObject(), favoriteCount: count };
      })
    );

    const validFavorites = favoritesWithCounts.filter(Boolean);

    res.render('favorites/index', { favorites: validFavorites });

  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
}

module.exports = {
  create,
  remove,
  index
};
