import { Router } from "express";
import {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload
} from "../controllers/bootcamps";
import { courseRoutes } from "./courses";
import { advancedResults } from "../middleware/advancedResults";
import { BootcampModel } from "../models/Bootcamp";

const bootcampRoutes = Router();

// Re-route into other resource routers
bootcampRoutes.use("/:bootcampId/courses", courseRoutes);

bootcampRoutes.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

bootcampRoutes.route("/:id/photo").put(bootcampPhotoUpload);

bootcampRoutes
  .route("/")
  .get(advancedResults(BootcampModel, "courses"), getBootcamps)
  .post(createBootcamp);

bootcampRoutes
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

export { bootcampRoutes };