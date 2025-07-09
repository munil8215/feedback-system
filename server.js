const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Feedback = require('./models/Feedback');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/feedbackDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// POST: Submit Feedback
app.post('/api/feedback', async (req, res) => {
  try {
    const { name, course, rating, comment } = req.body;
    const newFeedback = new Feedback({ name, course, rating, comment });
    await newFeedback.save();
    res.status(200).json({ message: '✅ Feedback submitted!' });
  } catch (error) {
    res.status(500).json({ error: '❌ Could not save feedback' });
  }
});

// GET: View Feedback
app.get('/api/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: '❌ Could not fetch feedback' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
