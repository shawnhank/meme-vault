const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value);
      },
      message: 'Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.'
    }
  },
  avatarSeed: {
    type: String,
    required: true,
    default: () => Math.random().toString(36).slice(2, 10)
  },
  bio: { type: String },
  social: {
    instagram: String,
    twitter: String,
    facebook: String,
    linkedin: String
  }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model('User', userSchema);