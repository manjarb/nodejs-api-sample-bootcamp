import { Router } from "express";
import {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse
} from "../controllers/courses";

const courseRoutes = Router({ mergeParams: true });

courseRoutes
  .route("/")
  .get(getCourses)
  .post(addCourse);

courseRoutes
  .route("/:id")
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse);

export { courseRoutes };
