# Expense Splitter Backend

A production-ready backend API for splitting group expenses, inspired by Splitwise.  
Supports authentication, group management, expense tracking, and balance calculation.

---

## Live Demo
Backend URL:  
https://expensespliter.onrender.com  

Swagger API Docs:  
https://expensespliter.onrender.com/api-docs  

Full-stack live URL:
https://expense-frontend-peach-three.vercel.app
---

## Features
-  User authentication using JWT
-  Create and manage groups
-  Add shared expenses within groups
-  Automatic equal expense splitting
-  Group-wise balance calculation
-  Secure protected routes with middleware
-  Interactive API documentation using Swagger

---

## Tech Stack
- **Node.js**
- **Express.js**
- **PostgreSQL**
- **Sequelize ORM**
- **JWT (JSON Web Tokens)**
- **Swagger (OpenAPI)**
- **Deployed on Render**

---

## Authentication Flow
1. User registers or logs in
2. Server issues a JWT
3. Client sends JWT in request headers
4. Protected routes are validated via middleware

---

## Setup Locally

```bash
git clone https://github.com/Eswarpulaparthi/expenseSpliter
cd expenseSpliter
npm install
npm start
