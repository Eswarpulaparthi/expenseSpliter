import { Router } from "express";
import {
  addUserToGroup,
  createGroup,
  groupMembers,
  groups,
} from "../controllers/groupController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: Group management routes
 */

/**
 * @swagger
 * /create-group:
 *   post:
 *     summary: Create a new group
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Goa Trip
 *     responses:
 *       201:
 *         description: Group created successfully
 */
router.post("/create-group", createGroup);

/**
 * @swagger
 * /groups:
 *   get:
 *     summary: Get all groups of the logged-in user
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: List of groups
 */
router.get("/groups", groups);

/**
 * @swagger
 * /groups/{groupId}/users/{userId}:
 *   post:
 *     summary: Add a user to a group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User added to group successfully
 */
router.post("/groups/:groupId/users/:userId", addUserToGroup);

/**
 * @swagger
 * /groups/{id}/members:
 *   get:
 *     summary: Get all members of a group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Group members fetched successfully
 */
router.get("/groups/:id/members", groupMembers);

export default router;
