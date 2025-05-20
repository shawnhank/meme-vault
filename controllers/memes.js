const Meme = require('../models/meme');     // Import the Meme model

// GET /memes → Index view (list all memes)
async function index(req, res) {
  const memes = await Meme.find();      // Fetch all memes from the database
  res.render('memes/index', { memes, query: req.query }); // Render the meme index view
}

// GET /memes/new → Show form to create a new meme
function newForm(req, res) {
  // If user is not logged in, redirect to register with a message
  if (!req.session.user) {
    req.flash('error', 'Please sign up / create an account to add memes.');
    return res.redirect('/register');
  }

  // Otherwise render the meme creation form
  res.render('memes/new', { meme: {} });   // show the empty form to populate on new & pass empty meme object
}

// POST /memes → create new meme and save owner/creator info
async function create(req, res) {
  try {
    const user = req.session.user; // ✅ Get user from session

    // Create a new meme using form data and user ID
    await Meme.create({           // Create a new meme using the form data
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      createdBy: user._id
    });

    req.flash('success', 'Meme created successfully.');
    res.redirect('/memes');
  } catch (err) {
    console.log(err);
    req.flash('error', 'Failed to create meme.');
    res.redirect('/memes/new');   // Redirect to index page after creation
  }
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
  await Meme.findByIdAndDelete(req.params.id);            // Delete meme by ID
  req.flash('success', 'Meme deleted successfully.');     // Flash success message for feedback
  res.redirect('/memes');                                 // Redirect back to index without query string
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