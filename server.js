require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Meme = require('./models/meme');
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

// Routes

// This route gets all memes from the database and also passes along
// any query string data (like ?deleted=true) to the template.
// The view uses that to optionally show feedback messages to the user (e.g. delete successful)
app.get('/memes', async (req, res) => {
  const memes = await Meme.find();
  res.render('memes/index', { memes, query: req.query });
});

// Get /   Memes index (list of all memes)
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// GET /memes/new   New Form
app.get('/memes/new', (req, res) => {
  res.render('memes/new');
});

// POST /memes  CREATE function
app.post('/memes', async (req, res) => {
  await Meme.create(req.body);
  res.redirect('/memes');
});

// GET memes/:id SHOW function
app.get('/memes/:id', async (req, res) => {
  const meme = await Meme.findById(req.params.id);
  res.render('memes/show', { meme });
});

// GET /memes/:id/edit  EDIT Action
app.get('/memes/:id/edit', async (req, res) => {
  const meme = await Meme.findById(req.params.id);
  res.render('memes/edit', { meme });
});

// PUT /memes/:id  UPDATE Action
app.put('/memes/:id', async (req, res) => {
  await Meme.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/memes/${req.params.id}`);
});

// DELETE /memess/:id  DELETE Action
app.delete('/memes/:id', async (req, res) => {
  await Meme.findByIdAndDelete(req.params.id);
  res.redirect('/memes?deleted=true');
});

// Listen for incoming requests on port 3000
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
