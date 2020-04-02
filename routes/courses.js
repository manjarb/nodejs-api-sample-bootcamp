import { Router } from "express";
import {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse
} from "../controllers/courses";
import { advancedResults } from "../middleware/advancedResults";
import { CourseModel } from "../models/Course";

const courseRoutes = Router({ mergeParams: true });

courseRoutes
  .route("/")
  .get(
    advancedResults(CourseModel, {
      path: "bootcamp",
      select: "name description"
    }),
    getCourses
  )
  .post(addCourse);

courseRoutes
  .route("/:id")
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse);

export { courseRoutes };
