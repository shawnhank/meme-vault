const mongoose = require('mongoose');

function arrayLimit(val) {
  return val.length <= 3;
}

const memeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: {
    type: [String],
    validate: [arrayLimit, '{PATH} exceeds the limit of 3']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }]
}, { timestamps: true });

const Meme = mongoose.model('Meme', memeSchema);

module.exports = Meme;