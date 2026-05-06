const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Untitled Snippet'
  },
  content: {
    type: String,
    required: true
  },
  stats: {
    chars: Number,
    lines: Number,
    size: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Snippet', snippetSchema);
