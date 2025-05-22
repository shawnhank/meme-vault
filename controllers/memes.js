const Meme = require('../models/meme');     // Import the Meme model
const Tag = require('../models/tag');       // Import the Tag model
const Favorite = require('../models/favorite'); // Import the Favorite model

// GET /memes → Index view (list all memes)
async function index(req, res) {
  try {
    const memes = await Meme.find().lean(); // lean gives you plain JS objects
    const memeData = await Promise.all(memes.map(async meme => {
      const count = await Favorite.countDocuments({ meme: meme._id });
      return { ...meme, favoriteCount: count };
    }));

    res.render('memes/index', { memes: memeData, mine: false, query: req.query });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not load memes.');
    res.redirect('/');
  }
}

async function myMemes(req, res) { // get all user owned memes
  try {
    const memes = await Meme.find({ createdBy: req.session.user._id }).lean();
    const memeData = await Promise.all(memes.map(async meme => {
      const count = await Favorite.countDocuments({ meme: meme._id });
      return { ...meme, favoriteCount: count };
    }));

res.render('memes/index', { memes: memeData, mine: true });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not load your memes.');
    res.redirect('/');
  }
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

// POST /memes → Create new meme and save owner/creator info
async function create(req, res) {
  try {
    const user = req.session.user; // ✅ Get the currently logged-in user from the session

    // Normalize submitted image inputs:
    // - If multiple fields were submitted, filter out any blank ones
    // - If only one field was filled, convert it into a one-item array
    // - If no image fields were filled, use an empty array
    const images = Array.isArray(req.body.images)
      ? req.body.images.filter(url => url.trim() !== '')   // Clean out blanks from array
      : req.body.images
        ? [req.body.images]                                // Wrap single string into array
        : [];                                               // No images submitted

    // Create a new Meme using form inputs and user ID
    // Parse and normalize tag input
    let submittedTags = req.body.tags || '';
    let tagNames = submittedTags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    // Capitalize first letter, lowercase rest
    tagNames = tagNames.map(tag =>
      tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()
    );

    // Remove duplicates
    tagNames = [...new Set(tagNames)];

    // Look up or create tags, collect _id references
    const tagIds = [];
    for (const tagName of tagNames) {
      let tag = await Tag.findOne({ name: tagName });
      if (!tag) {
        tag = await Tag.create({ name: tagName });
      }
      tagIds.push(tag._id);
    }

    // Create the meme and attach tag references
    await Meme.create({
      name: req.body.name,                // Meme title
      description: req.body.description,  // Meme description
      images: images,                     // Array of 1–3 image URLs
      createdBy: user._id,                // Link meme to logged-in user
      tags: tagIds                        // Array of tag ObjectIds
    });

    // Flash success message and redirect to all memes page
    req.flash('success', 'Meme created successfully.');
    res.redirect('/memes');
  } catch (err) {
    // If something fails, log the error and redirect with error message
    console.log(err);
    req.flash('error', 'Failed to create meme.');
    res.redirect('/memes/new');
  }
};

// GET /memes/:id → Show details of a single meme
async function show(req, res) {
  const meme = await Meme.findById(req.params.id)
    .populate('createdBy')     // Find meme by its unique ID
    .populate('tags');          // Find meme by tags

  // Count how many users have favorited this meme
  const favoriteCount = await Favorite.countDocuments({ meme: meme._id });

  // Check if the current user has already favorited this meme
  let isFavorited = false;
  if (req.session.user) {
    isFavorited = await Favorite.exists({
      user: req.session.user._id,
      meme: meme._id
    });
  }

  res.render('memes/show', { meme, favoriteCount, isFavorited });     // Pass everything to the view page
}

// GET /memes/:id/edit → Show edit form for an existing meme
async function editForm(req, res) {
  const meme = await Meme.findById(req.params.id)     // Fetch the meme to pre-fill the form
    .populate('tags');                                // Include full tag documents

  // Format tag names as comma-separated string
  if (meme.tags && meme.tags.length) {
    meme.tagsFormatted = meme.tags.map(tag => tag.name).join(', ');
  }

  res.render('memes/edit', { meme });                 // Render edit form with current meme data
}

// PUT /memes/:id → Update existing meme with new data
async function update(req, res) {
  try {
    // Normalize the submitted image fields:
    // - If it's an array (3 inputs), filter out any blank ones
    // - If it's a single string (only one input filled), wrap it as an array
    // - If nothing is submitted, use an empty array
    const images = Array.isArray(req.body.images)
      ? req.body.images.filter(url => url.trim() !== '')   // Filter out blank inputs
      : req.body.images
        ? [req.body.images]                                // Single image submitted, make it an array
        : [];                                               // No images submitted

    // Update the meme with new form data:
    // - Replace name, description, and images fields
    // Parse and normalize tag input
    let submittedTags = req.body.tags || '';
    let tagNames = submittedTags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    tagNames = tagNames.map(tag =>
      tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()
    );

    tagNames = [...new Set(tagNames)];

    // Look up or create tags, collect _id references
    const tagIds = [];
    for (const tagName of tagNames) {
      let tag = await Tag.findOne({ name: tagName });
      if (!tag) {
        tag = await Tag.create({ name: tagName });
      }
      tagIds.push(tag._id);
    }

    // Update meme including tags
    await Meme.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      description: req.body.description,
      images: images,
      tags: tagIds
    });

    // Redirect to the updated meme's show page
    res.redirect(`/memes/${req.params.id}`);
  } catch (err) {
    // If anything fails, log the error and redirect with flash message
    console.error(err);
    req.flash('error', 'Failed to update meme.');
    res.redirect(`/memes/${req.params.id}/edit`);
  }
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
  myMemes,
  newForm,
  create,
  show,
  editForm,
  update,
  destroy
};