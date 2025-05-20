require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session'); // store session data server-side
const methodOverride = require('method-override');
const flash = require('connect-flash');
const Meme = require('./models/meme');
const authRoutes = require('./routes/auth');   // Import login/register/logout routes
const memeRoutes = require('./routes/memes');  // IMport meme routhes
const userRoutes = require('./routes/users');  // Import user profile routes

// create app listening port
const port = process.env.PORT || 3000;

// create express app
const app = express();

// database connection
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// middleware

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));


// Configure express-session
// middleware provides cookie-based session store
// comes before connect-flash so flash can use the session
app.use(session({
  // Secret string used to sign the session ID cookie
  secret: process.env.SESSION_SECRET || 'memevaultsupersecret',

  // resave: false = don't save session if nothing has changed
  resave: false,

  // saveUninitialized: false = don't create session until something is stored in it
  saveUninitialized: false
}));

// Enable flash messaging (requires session to work)
// Allows you to use req.flash('key', 'message') and store temporary messages
app.use(flash());

// Middleware to pass flash messages to all views
// res.locals = data available to all EJS templates automatically
// These get rendered by <%= success %> or <%= error %> in the views
app.use((req, res, next) => {
  res.locals.success = req.flash('success');  // e.g. "Logged in successfully"
  res.locals.error = req.flash('error');      // e.g. "Invalid password"
  
  console.log('flash success:', res.locals.success);
  console.log('flash error:', res.locals.error);
  
  res.locals.currentUser = req.session.user;  // make currentUser available in all views
  
  // Allow logout message via query param if session was destroyed
  if (req.query.loggedOut === 'true') {
    res.locals.success = ['You have been logged out.'];
  }
  
  next();
});


// Routers
app.use('/', authRoutes);       // Mount auth routes at root (e.g. /login, /register, /logout)
app.use('/users', userRoutes);  // mount user profile routes
app.use('/memes', memeRoutes);  // mount meme routes

// Get /   Memes index (list of all memes)
app.get("/", async (req, res) => {
  res.render("index.ejs");
});


// Listen for incoming requests on port 3000
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
