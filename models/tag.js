const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures global uniqueness
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Tag', tagSchema);