const Meme = require('../models/meme'); // Import the Meme model

// Middleware to check if the logged-in user owns the resource
async function isOwner(req, res, next) {
  try {
    // Find the meme by ID from the route parameter
    const meme = await Meme.findById(req.params.id);

    // If no meme was found, show error and redirect
    if (!meme) {
      req.flash('error', 'Meme not found.');
      return res.redirect('/memes'); //redirect to the memes index (/memes)
    }

    // Check if the logged-in user is the one who created the meme
    if (!meme.createdBy.equals(user._id)) {
      req.flash('error', 'Not authorized.');
      return res.redirect('/memes');  //redirect to the memes index (/memes)
    }

    // If user is the owner, allow the request to proceed
    next();
  } catch (err) {
    // If any error occurs, log it and redirect with an error message
    console.log(err);
    req.flash('error', 'Permission check failed.');
    res.redirect('/memes');  //redirect to the memes index (/memes)
  }
}

// Export the middleware for use in routes
module.exports = { isOwner }; 