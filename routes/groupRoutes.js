import { Router } from "express";
import {
  addUserToGroup,
  createGroup,
  groupMembers,
  groups,
} from "../controllers/groupController.js";

const router = Router();

router.post("/create-group", createGroup);
router.get("/groups", groups);
router.post("/groups/:groupId/users/:userId", addUserToGroup);
router.get("/groups/:id/members", groupMembers);

export default router;
