const mongoose = require('mongoose');     // Import the mongoose library;define the schema and model

// Define structure for a Meme doc
const memeSchema = new mongoose.Schema({
  // Name of the meme (title) — required
  name: { type: String, required: true },

  // Description of the meme — required
  description: { type: String, required: true },

  // Image URL — optional (not required)
  image: String,
  
  // User who created the meme
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

// Create Meme model from the schema to access Meme.create(), Meme.find(), etc.
const Meme = mongoose.model('Meme', memeSchema);


// Export the model so it can be used in controllers/routes
module.exports = Meme;