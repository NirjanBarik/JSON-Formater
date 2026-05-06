const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Snippet = require('./models/Snippet');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
// Save a snippet
app.post('/api/snippets', async (req, res) => {
  try {
    const { name, content, stats } = req.body;
    const newSnippet = new Snippet({ name, content, stats });
    await newSnippet.save();
    res.status(201).json(newSnippet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all snippets
app.get('/api/snippets', async (req, res) => {
  try {
    const snippets = await Snippet.find().sort({ createdAt: -1 });
    res.json(snippets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a snippet
app.delete('/api/snippets/:id', async (req, res) => {
  try {
    await Snippet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Snippet deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
