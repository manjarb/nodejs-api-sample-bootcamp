import { Router } from "express";
import {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} from "../controllers/bootcamps";
import { courseRoutes } from "./courses";
import { advancedResults } from "../middleware/advancedResults";
import { BootcampModel } from "../models/Bootcamp";
import { protect, authorize } from "../middleware/auth";
import { reviewRoutes } from "./review";

const bootcampRoutes = Router();

// Re-route into other resource routers
bootcampRoutes.use("/:bootcampId/courses", courseRoutes);
bootcampRoutes.use("/:bootcampId/reviews", reviewRoutes);

bootcampRoutes.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

bootcampRoutes
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), bootcampPhotoUpload);

bootcampRoutes
  .route("/")
  .get(advancedResults(BootcampModel, "courses"), getBootcamps)
  .post(protect, authorize("publisher", "admin"), createBootcamp);

bootcampRoutes
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize("publisher", "admin"), updateBootcamp)
  .delete(protect, authorize("publisher", "admin"), deleteBootcamp);

export { bootcampRoutes };
