import Router from "express";

import {
  createExpense,
  deleteExpenses,
  getBalance,
  getExpenses,
} from "../controllers/expenseController.js";
const router = Router();

router.post("/groups/:groupId/create-expense", createExpense);

router.get("/group/:groupId/expenses", getExpenses);

router.get("/groups/:groupId/balance", getBalance);

router.delete("/group/:groupId/expenses", deleteExpenses);

export default router;
