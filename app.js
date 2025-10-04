const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses'); 
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes); // ✅ Register expense routes

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

// Start server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
