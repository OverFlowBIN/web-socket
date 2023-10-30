const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // field 1
  name: {
    type: String,
    required: [true, 'User must type name'],
    unique: true,
  },
  // field 2
  token: {
    type: String,
  },
  // field 3
  online: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', userSchema);
