import express from "express";
import { getUserProfiles, swipeLeft, swipeRight, getMatches } from "../Controllers/matches.controller.js";
import {protectRoute} from "../Middleware/auth.js";

const router = express.Router();

router.post("/swipe-right/:likedUserId",protectRoute,swipeRight);

router.post("/swipe-left/:dislikedUserId",protectRoute,swipeLeft);

router.get("/",protectRoute,getMatches);
router.get("/user-profiles",protectRoute,getUserProfiles);

export default router;