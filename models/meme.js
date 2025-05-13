const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: String
});

const Meme = mongoose.model('Meme', memeSchema); //schema for meme app

module.exports = Meme;