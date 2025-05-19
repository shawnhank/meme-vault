const User = require('../models/user');      // Load the User model
const bcrypt = require('bcrypt');            // For comparing hashed passwords

// Show login form page
function showLoginForm(req, res) {
  res.render('auth/login');                 // Render the login form EJS view
}

// Handle login POST request
async function login(req, res) {
  const { email, password } = req.body;     // Pull submitted email + password from the form

  try {
    // match email to find user in the database
    const user = await User.findOne({ email }); 

    // If no user found, show error and redirect to login
    if (!user) {
      req.flash('error', 'No user found with that email.');
      return res.redirect('/login');   // redirect to login page
    }

    // Compare password with hashed password in the DB
    const match = await bcrypt.compare(password, user.password);

    // If passwords don't match, show error and redirect
    if (!match) {
      req.flash('error', 'Incorrect password.');
      return res.redirect('/login');  // redirect to login page
    }

    // If passwords match, save the full user object.
    req.session.user = user;

    // Flash a success message redirect to the homepage
    req.flash('success', 'Logged in successfully.');
    res.redirect('/');
  } catch (err) {
    // If something breaks, log the error and show message
    console.log(err);
    req.flash('error', 'Login failed. Try again.');
    res.redirect('/login');
  }
}

// Handle registration POST request
async function register(req, res) {
  try {
    // Pull email and password from submitted form
    const { email, password } = req.body;

    // Create new user in the database
    const user = await User.create({ email, password });

    // Save the full user object in the session
    req.session.user = user;

    // Flash a message confirming account creation
    req.flash('success', 'Account created successfully. You are now logged in.');

    // Redirect to homepage
    res.redirect('/');
  } catch (err) {
    console.log(err);

    // Flash a generic error message
    req.flash('error', 'Registration failed. Try again.');
    res.redirect('/register');
  }
}


// Export controller functions used in auth routes
module.exports = {
  showLoginForm,
  login,
  register,
};