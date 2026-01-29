# Expense Splitter Backend

A full-stack ready backend for splitting expenses within groups, inspired by Splitwise.

## Live Demo
Backend: https://expensespliter.onrender.com

## Features
- User authentication (JWT)
- Create and manage groups
- Add shared expenses
- Automatic equal expense splitting
- Secure protected routes

## Tech Stack
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT
- Deployed on Render

## Authentication Flow
1. User logs in
2. Server creates JWT
3. Protected routes validated via middleware

## Setup Locally
```bash
git clone https://github.com/Eswarpulaparthi/expenseSpliter
cd expenseSpliter
npm install
npm start
