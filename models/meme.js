const mongoose = require('mongoose');     // Import the mongoose library;define the schema and model

function arrayLimit(val) {
  return val.length <= 3;
}

// Define structure for a Meme doc
const memeSchema = new mongoose.Schema({
  // Name of the meme (title) — required
  name: { type: String, required: true },

  // Description of the meme — required
  description: { type: String, required: true },

  // Image URL — optional (not required) array of string, up to 3
  images: {
    type: [String],
    validate: [arrayLimit, '{PATH} exceeds the limit of 3']
  },  
  
  // User who created the meme
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Tags (references to Tag documents)
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }],  
}, { timestamps: true });

// Create Meme model from the schema to access Meme.create(), Meme.find(), etc.
const Meme = mongoose.model('Meme', memeSchema);


// Export the model so it can be used in controllers/routes
module.exports = Meme;