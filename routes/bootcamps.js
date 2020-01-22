import { Router } from "express";
import {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius
} from "../controllers/bootcamps";
import { courseRoutes } from "./courses";

const bootcampRoutes = Router();

// Re-route into other resource routers
bootcampRoutes.use("/:bootcampId/courses", courseRoutes);

bootcampRoutes.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

bootcampRoutes
  .route("/")
  .get(getBootcamps)
  .post(createBootcamp);

bootcampRoutes
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

export { bootcampRoutes };
