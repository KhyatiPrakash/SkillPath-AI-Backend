import express from "express";
import {
  createCareer,
  getCareers,
  getCareerById,
  updateCareer,
  deleteCareer,
} from "../controllers/careerController.js";

const router = express.Router();

router.route("/")
  .post(createCareer)
  .get(getCareers);

router.route("/:id")
  .get(getCareerById)
  .put(updateCareer)
  .delete(deleteCareer);

export default router;