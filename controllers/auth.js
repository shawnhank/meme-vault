const User = require('../models/user');
const bcrypt = require('bcrypt');

function showLoginForm(req, res) {
  res.render('auth/login', { hideCTA: true });
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      req.flash('error', 'No user found with that email.');
      return res.redirect('/login');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      req.flash('error', 'Incorrect password.');
      return res.redirect('/login');
    }

    req.session.user = user;

    req.flash('success', 'Logged in successfully.');
    res.redirect('/');
  } catch (err) {
    req.flash('error', 'Login failed. Try again.');
    res.redirect('/login');
  }
}

async function register(req, res) {
  try {
    const {
      name,
      email,
      password,
      confirm,
      bio,
      instagram,
      twitter,
      facebook,
      linkedin,
    } = req.body;

    if (!name || !email || !password || !confirm) {
      req.flash('error', 'All fields marked with * are required.');
      return res.redirect('/register');
    }

    const existingName = await User.findOne({ name });
    if (existingName) {
      req.flash('error', 'Username is already taken.');
      return res.redirect('/register');
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      req.flash('error', 'Email is already registered.');
      return res.redirect('/register');
    }

    if (password !== confirm) {
      req.flash('error', 'Passwords do not match.');
      return res.redirect('/register');
    }

    const user = await User.create({
      name,
      email,
      password,
      bio,
      social: { instagram, twitter, facebook, linkedin },
    });

    req.session.user = user;

    req.flash(
      'success',
      'Account created successfully. You are now logged in.'
    );
    res.redirect('/');
  } catch (err) {
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

function showRegisterForm(req, res) {
  res.render('auth/register', { hideCTA: true });
}

module.exports = {
  showLoginForm,
  login,
  register,
  showRegisterForm,
};
