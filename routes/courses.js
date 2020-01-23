import { Router } from "express";
import { getCourses, getCourse, addCourse } from "../controllers/courses";

const courseRoutes = Router({ mergeParams: true });

courseRoutes
  .route("/")
  .get(getCourses)
  .post(addCourse);

courseRoutes.route("/:id").get(getCourse);

export { courseRoutes };
