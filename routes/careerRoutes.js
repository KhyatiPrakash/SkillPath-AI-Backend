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

const router = express.Router();

// Search & Filter Routes (Must come BEFORE /:id)
router.get("/search", searchCareers);
router.get("/filter", filterCareers);

// CRUD Routes
router.route("/")
  .post(createCareer)
  .get(getCareers);

router.route("/:id")
  .get(getCareerById)
  .put(updateCareer)
  .delete(deleteCareer);

export default router;