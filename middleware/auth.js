// Middleware to protect routes from unauthenticated access
function isLoggedIn(req, res, next) {
  // does session user exist? is user logged in?
  if (!req.session.user) {
    // If not show error and redirect to login
    req.flash('error', 'You must be logged in to do that. Please create an account to continue.');
    return res.redirect('/register'); 
  }

  // If logged in, continue
  next();
}

// Export the middleware for use in routes
module.exports = { isLoggedIn };