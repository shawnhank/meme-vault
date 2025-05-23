// Load Mongoose library
const mongoose = require('mongoose');

// Define the schema for a Rating document
const ratingSchema = new mongoose.Schema({
  // Reference to the User who made the rating
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  // Reference to the Meme being rated
  meme: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Meme', 
    required: true 
  },

  // The rating value (integer from 1 to 5)
  value: { 
    type: Number, 
    min: 1, 
    max: 5, 
    required: true 
  }

}, { 
  // Automatically track createdAt and updatedAt timestamps
  timestamps: true 
});

// Many-to-Many relationship summary:
//
// - One user can rate many memes
// - One meme can receive ratings from many users
// - But: only one rating per user per meme is allowed
//
// This index enforces that rule by ensuring that each
// (user, meme) pair can only exist once in the collection
ratingSchema.index({ user: 1, meme: 1 }, { unique: true });

// Export the model for use in other parts of the app
module.exports = mongoose.model('Rating', ratingSchema);