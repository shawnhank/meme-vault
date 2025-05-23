require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const Meme = require('./models/meme');
const authRoutes = require('./routes/auth');
const memeRoutes = require('./routes/memes');
const userRoutes = require('./routes/users');
const tagsRouter = require('./routes/tags');
const searchRouter = require('./routes/search');
const favoritesRoutes = require('./routes/favorites');

const port = process.env.PORT || 3000;
const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'memevaultsupersecret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currentUser = req.session.user;
  res.locals.hideCTA = false;
  if (req.query.loggedOut === 'true') {
    res.locals.success = ['You have been logged out.'];
  }
  next();
});

app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/memes', memeRoutes);
app.use('/tags', tagsRouter);
app.use('/search', searchRouter);
app.use('/favorites', favoritesRoutes);

app.get('/', async (req, res) => {
  res.render('index.ejs');
});

app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(port, () => {});
