# Expense Management System

A full-stack web app to track personal expenses: sign up, log expenses by category, and see where your money goes with totals and a category pie chart. Export your data as CSV or PDF anytime.

**Live demo:** https://expense-management-o0ar.onrender.com

> Hosted on Render's free tier - the app sleeps after ~15 minutes of inactivity, so the first load after a quiet period can take up to a minute. That's normal.

## Features

- User signup and login (JWT-based authentication, passwords hashed with bcrypt)
- Add expenses with category, amount, description, and date
- View all your expenses in a table
- Monthly total with a filterable view
- Pie chart of expenses by category
- Download your expenses as CSV or PDF

## Tech Stack

- **Frontend:** HTML, CSS, vanilla JavaScript (served from `public/`)
- **Backend:** Node.js, Express 5
- **Database:** MongoDB with Mongoose
- **Auth:** JSON Web Tokens + bcryptjs
- **Exports:** json2csv, PDFKit

## Run Locally

Prerequisites: Node.js 18+ and a MongoDB connection string (a free [MongoDB Atlas](https://www.mongodb.com/atlas) M0 cluster works).

```bash
git clone https://github.com/Vijayasri2005/Expense_Management.git
cd Expense_Management
npm install
```

Create a `.env` file in the project root:

```
MONGODB_URI=<your MongoDB connection string>
JWT_SECRET=<any long random string>
```

Then:

```bash
npm start
```

Open http://localhost:5000 in your browser.

## Deploy Your Own (Render, free)

1. Push this repo to your own GitHub account.
2. On [Render](https://render.com), create a new **Web Service** from the repo.
3. Build command: `npm install` - Start command: `npm start`
4. Add the environment variables `MONGODB_URI` and `JWT_SECRET`.
5. Deploy.

## Project Structure

```
app.js            Entry point (Express server, port 5000)
middleware/       JWT auth middleware
models/           Mongoose models (User, Expense)
routes/           /api/auth and /api/expenses routes
public/           Frontend (login page + dashboard)
```
