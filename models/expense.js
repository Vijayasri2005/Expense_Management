const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: String,
  amount: Number,
  description: String,
  date: Date
});

module.exports = mongoose.model('Expense', expenseSchema);
