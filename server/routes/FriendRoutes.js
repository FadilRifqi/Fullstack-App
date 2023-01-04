import express from "express";
import {
    createFriends,
    deleteFriends,
    getAllFriends,
    getFriendById,
} from "../controllers/FriendController.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/friends", verifyUser, getAllFriends);
router.get("/friends/:id", verifyUser, getFriendById);
router.post("/friends", verifyUser, createFriends);
router.delete("/friends", verifyUser, deleteFriends);

export default router;
