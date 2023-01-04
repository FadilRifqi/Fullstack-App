import express from "express";
import {
  createMessages,
  deleteMessages,
  getAllFriendMessages,
  getAllMessages,
} from "../controllers/MessageController.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/messages", verifyUser, getAllMessages);
router.get("/messages/:id", verifyUser, getAllFriendMessages);
router.post("/messages", verifyUser, createMessages);
router.delete("/messages/:id", verifyUser, deleteMessages);

export default router;
