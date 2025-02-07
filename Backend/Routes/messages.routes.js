import express from "express";
import { getConversation, sendMessage } from "../Controllers/message.controller.js";
import { protectRoute } from "../Middleware/auth.js";

const router = express.Router();

router.post("/send",protectRoute,sendMessage);

router.get("/conversation/:userId",protectRoute,getConversation)

export default router;