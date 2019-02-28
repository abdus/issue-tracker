const mongoose = require('mongoose');

let schema = new mongoose.Schema({
  issueTitle: { type: String, required: true },
  issueRepository: { type: String },
  issueDescription: { type: String },
  issueProject: { type: String, required: true },
  issueCreator: { type: String, required: true },
  date: { type: Date, default: Date },
  issueStatus: { type: String, default: 'open' }
});

module.exports = mongoose.model('issue-board', schema);
