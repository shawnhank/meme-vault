const Meme = require('../models/meme');

// GET /memes (index)
async function index(req, res) {
  const memes = await Meme.find();
  res.render('memes/index', { memes, query: req.query });
}

// GET /memes/new (form)
function newForm(req, res) {
  res.render('memes/new');
}

// POST /memes (create)
async function create(req, res) {
  await Meme.create(req.body);
  res.redirect('/memes');
}

// GET /memes/:id (show)
async function show(req, res) {
  const meme = await Meme.findById(req.params.id);
  res.render('memes/show', { meme });
}

// GET /memes/:id/edit (edit form)
async function editForm(req, res) {
  const meme = await Meme.findById(req.params.id);
  res.render('memes/edit', { meme });
}

// PUT /memes/:id (update)
async function update(req, res) {
  await Meme.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/memes/${req.params.id}`);
}

// DELETE /memes/:id (delete)
async function destroy(req, res) {
  await Meme.findByIdAndDelete(req.params.id);
  res.redirect('/memes?deleted=true');
}

module.exports = {
  index,
  newForm,
  create,
  show,
  editForm,
  update,
  destroy,
};