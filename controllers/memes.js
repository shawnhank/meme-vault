const Meme = require('../models/meme');     // Import the Meme model

// GET /memes → Index view (list all memes)
async function index(req, res) {
  const memes = await Meme.find();      // Fetch all memes from the database
  res.render('memes/index', { memes, query: req.query }); // Render the meme index view
}

// GET /memes/new → Show form to create a new meme
function newForm(req, res) {
  res.render('memes/new');      // show the empty form to populate on new
}

// POST /memes → Handle submission of new meme
async function create(req, res) {
  await Meme.create(req.body);      // Create a new meme using the form data
  res.redirect('/memes');           // Redirect to index page after creation
}

// GET /memes/:id → Show details of a single meme
async function show(req, res) {
  const meme = await Meme.findById(req.params.id);    // Find meme by its unique ID
  res.render('memes/show', { meme });                 // show meme details view/page
}

// GET /memes/:id/edit → Show edit form for an existing meme
async function editForm(req, res) {
  const meme = await Meme.findById(req.params.id);      // Fetch the meme to pre-fill the form
  res.render('memes/edit', { meme });                   // Render edit form with current meme data
}

// PUT /memes/:id → Update existing meme with new data
async function update(req, res) {
  await Meme.findByIdAndUpdate(req.params.id, req.body);  // Overwrite existing meme with submitted changes
  res.redirect(`/memes/${req.params.id}`);                // Redirect to meme’s show page. updates will appear on page.
}

// DELETE /memes/:id → Remove a meme from the database
async function destroy(req, res) {
  await Meme.findByIdAndDelete(req.params.id);            // Delete the meme by ID
  res.redirect('/memes?deleted=true');                    // Redirect back to index
}

// Export all controller functions so routes can use them
module.exports = {
  index,
  newForm,
  create,
  show,
  editForm,
  update,
  destroy,
};