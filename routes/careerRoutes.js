import express from "express";
import {
  createCareer,
  getCareers,
  getCareerById,
  updateCareer,
  deleteCareer,
  searchCareers,
  filterCareers,
} from "../controllers/careerController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/search", searchCareers);
router.get("/filter", filterCareers);

router.get("/", getCareers);
router.get("/:id", getCareerById);

// Admin Routes
router.post("/", protect, adminOnly, createCareer);

router.put("/:id", protect, adminOnly, updateCareer);

router.delete("/:id", protect, adminOnly, deleteCareer);

export default router;