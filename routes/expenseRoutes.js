import { Router } from "express";
import {
  createExpense,
  deleteExpenses,
  getBalance,
  getExpenses,
} from "../controllers/expenseController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: Expense management routes
 */

/**
 * @swagger
 * /groups/{groupId}/create-expense:
 *   post:
 *     summary: Create a new expense in a group
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Group ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paidBy
 *               - amount
 *               - description
 *               - category
 *             properties:
 *               paidBy:
 *                 type: integer
 *                 example: 2
 *               amount:
 *                 type: number
 *                 example: 1000
 *               description:
 *                 type: string
 *                 example: Dinner
 *               category:
 *                 type: string
 *                 example: Food
 *     responses:
 *       201:
 *         description: Expense created successfully
 */
router.post("/groups/:groupId/create-expense", createExpense);

/**
 * @swagger
 * /group/{groupId}/expenses:
 *   get:
 *     summary: Get all expenses of a group
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of expenses
 */
router.get("/group/:groupId/expenses", getExpenses);

/**
 * @swagger
 * /groups/{groupId}/balance:
 *   get:
 *     summary: Get balance of a group
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Group balance details
 */
router.get("/groups/:groupId/balance", getBalance);

/**
 * @swagger
 * /group/{groupId}/expenses:
 *   delete:
 *     summary: Delete all expenses of a group
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Expenses deleted successfully
 */
router.delete("/group/:groupId/expenses", deleteExpenses);

export default router;
