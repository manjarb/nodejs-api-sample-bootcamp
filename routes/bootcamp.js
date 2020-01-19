import { Router } from "express";
import {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius
} from "../controllers/bootcamps";

const bootcampRoutes = Router();

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
