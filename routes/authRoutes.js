import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  saveCareer,
  getSavedCareers,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.post("/logout", protect, logoutUser);
router.post(
  "/save-career/:careerId",
  protect,
  saveCareer
);

router.get(
  "/saved-careers",
  protect,
  getSavedCareers
);

export default router;