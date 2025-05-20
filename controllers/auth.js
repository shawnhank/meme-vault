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
    // Extract all form inputs submitted from the registration page
    const {
      name,
      email,
      password,
      confirm,
      bio,
      instagram,
      twitter,
      facebook,
      linkedin
    } = req.body;

    // Check for required fields: name, email, password, confirm
    if (!name || !email || !password || !confirm) {
      req.flash('error', 'All fields marked with * are required.');
      return res.redirect('/register');
    }

    // Step 1: check if username is taken
    const existingName = await User.findOne({ name });
    if (existingName) {
      req.flash('error', 'Username is already taken.');
      return res.redirect('/register');
    }

    // Step 2: check if email is already registered
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      req.flash('error', 'Email is already registered.');
      return res.redirect('/register');
    }

    // Step 3: confirm password matches
    if (password !== confirm) {
      req.flash('error', 'Passwords do not match.');
      return res.redirect('/register');
    }

    // Step 4: create user (schema will validate password)
    const user = await User.create({
      name,
      email,
      password,
      bio,
      social: { instagram, twitter, facebook, linkedin }
    });

    // Log the user in by saving their full user object in the session
    req.session.user = user;

    // Flash success message and redirect to homepage
    req.flash('success', 'Account created successfully. You are now logged in.');
    res.redirect('/');
  } catch (err) {
    // Log any database or validation errors and show generic message
    console.log(err);
    // If it's a Mongoose validation error (like password rules)
    if (err.name === 'ValidationError') {
      req.flash('error', err.message);
    } else if (err.code === 11000) {
      req.flash('error', 'A user with that email already exists.');
    } else {
      req.flash('error', 'Unexpected error during registration.');
    }
  res.redirect('/register');
  }
}

// Show the registration form view
function showRegisterForm(req, res) {
  res.render('auth/register');  // Render the signup form
}

// Export controller functions used in auth routes
module.exports = {
  showLoginForm,
  login,
  register,
  showRegisterForm,
};