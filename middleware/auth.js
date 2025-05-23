function isLoggedIn(req, res, next) {
  if (!req.session.user) {
    req.flash('error', 'You must be logged in to do that. Please create an account to continue.');
    return res.redirect('/register'); 
  }
  next();
}
module.exports = { isLoggedIn };