// Import required libraries
const mongoose = require('mongoose'); // Mongoose connects to MongoDB
const bcrypt = require('bcrypt');     // Bcrypt hashes passwords securely

// Define the schema for a User
const userSchema = new mongoose.Schema({
  // Full name of the user
  name: { type: String, required: true },
  // Email must be provided and must be unique in the database
  email: { type: String, required: true, unique: true },
  // Complex Password must be provided (will be validated to ensure it meets minimum requirements)
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {   // pw validator function
        // Must be at least 8 characters, include one letter and one number #regexFTW
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value);
      },
      message: 'Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.'
    }
  },
  // User bio (optional)
  bio: { type: String },
  avatarSeed: { type: String },                   // used to generate avatar
  social: {                                       // Social links
  instagram: String,
  twitter: String,
  facebook: String,
  linkedin: String
  }
});

// Middleware hashes password before saving to database
userSchema.pre('save', async function (next) {
  // If the password hasn't changed, skip hashing
  if (!this.isModified('password')) return next();

  // Hash the password using bcrypt (12 salt rounds)
  this.password = await bcrypt.hash(this.password, 12);

  // Continue saving the user
  next();
});

// Export the model so other files can use it
module.exports = mongoose.model('User', userSchema);