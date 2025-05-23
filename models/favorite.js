const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  meme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meme',
    required: true
  }
}, {
  timestamps: true
});

favoriteSchema.index({ user: 1, meme: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);


