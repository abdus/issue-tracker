const mongoose = require('mongoose');

let schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false }
});

schema.pre('save', next => {
  console.log(this);
  next();
});

module.exports = mongoose.model('users', schema);
