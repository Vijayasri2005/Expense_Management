const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');
const authMiddleware = require('../middleware/auth'); // Import the auth middleware
const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');

// Add new expense (protected route)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { category, amount, description, date } = req.body;
    const expense = new Expense({
      user: req.userId,  // User ID from the token (added by the middleware)
      category,
      amount,
      description,
      date
    });
    await expense.save();
    res.json(expense);  // Return the added expense as JSON response
  } catch (err) {
    res.status(500).json({ error: 'Error saving expense' });
  }
});

// Get all expenses (protected route)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.userId }).sort({ date: -1 });  // Sort by date descending
    res.json(expenses);  // Return the expenses list as JSON response
  } catch (err) {
    res.status(500).json({ error: 'Error fetching expenses' });
  }
});

// Export expenses to CSV (protected route)
router.get('/export/csv', authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.userId });  // Get expenses of the logged-in user

    const fields = ['category', 'amount', 'description', 'date'];  // Define fields for CSV
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(expenses);  // Convert expenses to CSV format

    // Set headers and send CSV file as response
    res.header('Content-Type', 'text/csv');
    res.attachment('expenses.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: 'Error exporting CSV' });
  }
});

// Export expenses to PDF (protected route)
router.get('/export/pdf', authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.userId });  // Get expenses of the logged-in user

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=expenses.pdf');
    doc.pipe(res);  // Pipe the PDF document to the response

    // Add a title to the PDF
    doc.fontSize(18).text('Expense Report', { align: 'center' });
    doc.moveDown();

    // Loop through expenses and add them to the PDF
    expenses.forEach(exp => {
      doc.fontSize(12).text(`
Category: ${exp.category}
Amount: ₹${exp.amount}
Description: ${exp.description}
Date: ${new Date(exp.date).toLocaleDateString()}
-------------------------
`);
    });

    doc.end();  // End the document and send the response
  } catch (err) {
    res.status(500).json({ error: 'Error exporting PDF' });
  }
});

module.exports = router;
