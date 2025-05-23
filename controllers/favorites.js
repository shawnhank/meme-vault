const Favorite = require('../models/favorite');

async function create(req, res) {
  try {
    await Favorite.findOneAndUpdate(
      {
        user: req.session.user._id,
        meme: req.params.id,
      },
      {},
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    res.redirect(`/memes/${req.params.id}`);
  } catch (err) {
    res.redirect(`/memes/${req.params.id}`);
  }
}

async function remove(req, res) {
  try {
    await Favorite.findOneAndDelete({
      user: req.session.user._id,
      meme: req.params.id,
    });

    res.redirect(`/memes/${req.params.id}`);
  } catch (err) {
    res.redirect(`/memes/${req.params.id}`);
  }
}

async function index(req, res) {
  try {
    if (
      !req.session.user ||
      req.session.user._id.toString() !== req.params.id
    ) {
      req.flash('error', 'You must be logged in to view your favorites.');
      return res.redirect('/404');
    }

    const rawFavorites = await Favorite.find({ user: req.params.id }).populate({
      path: 'meme',
      populate: { path: 'createdBy' },
    });

    console.log('Raw favorites:', rawFavorites);

    const favoritesWithCounts = await Promise.all(
      rawFavorites.map(async (fav) => {
        const meme = fav.meme;

        if (!meme || !meme._id) {
          console.log(
            'Skipping favorite due to missing meme. It may have been deleted.',
            fav
          );
          return null;
        }

        const count = await Favorite.countDocuments({ meme: meme._id });
        return { ...meme.toObject(), favoriteCount: count };
      })
    );

    const validFavorites = favoritesWithCounts.filter(Boolean);

    res.render('favorites/index', {
      favorites: validFavorites,
      currentUser: req.session.user || null,
    });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
}

module.exports = {
  create,
  remove,
  index,
};
