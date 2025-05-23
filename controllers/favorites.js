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
    // if you aren't a logged in user, or if your session.user._id doesn't equal
    // req.params.userID, redirect and render the 404 page and flash the error message.
    // using .toString to conver user._ID from data type ObjectID to string so the session
    // userID and userID in the URL are both compared as strings.
    if (!req.session.user || req.session.user._id.toString() !== req.params.id) {
      req.flash('error', 'You must be logged in to view your favorites.');
      return res.redirect('/404');
    }
    //Find all favorites for a given user. For each favorite, also grab the
    // meme it points to. And inside each meme, also grab the user who created it.”
    const rawFavorites = await Favorite.find({ user: req.params.id })
      .populate({ path: 'meme', populate: { path: 'createdBy' } });
    
      console.log('Raw favorites:', rawFavorites);
    
    const favoritesWithCounts = await Promise.all(
      rawFavorites.map(async fav => {
        const meme = fav.meme;
    
        // ✅ Safety net: skip if meme is missing or malformed
        if (!meme || !meme._id) {                       // skip if meme was deleted
          console.log('Skipping favorite due to missing meme. It may have been deleted.', fav);
          return null;
        }
    
        const count = await Favorite.countDocuments({ meme: meme._id });
        return { ...meme.toObject(), favoriteCount: count };
      })
    );

    const validFavorites = favoritesWithCounts.filter(Boolean);

    // Render the favorites/index.ejs page based on the
    // favorites associated with the currently logged-in user
    res.render('favorites/index', {
      favorites: validFavorites,
      currentUser: req.session.user || null
    });

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
