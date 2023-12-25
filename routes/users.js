const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/pinterest'); // Connect to MongoDB

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullname: {
    type: String,
    required: true
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] // Array of Post references
});

userSchema.plugin(passportLocalMongoose); // Apply passport-local-mongoose plugin for authentication

const userModel = mongoose.model('User', userSchema); // Create User model

module.exports = userModel; // Export User model
