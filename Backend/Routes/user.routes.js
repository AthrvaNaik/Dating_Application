import express from "express";
import { protectRoute } from "../Middleware/auth.js";
import { updateProfile } from "../Controllers/user.controller.js";

const router = express.Router();

router.put("/update", protectRoute, updateProfile);

export default router;

