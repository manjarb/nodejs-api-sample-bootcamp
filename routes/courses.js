import { Router } from "express";
import {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courses";
import { advancedResults } from "../middleware/advancedResults";
import { CourseModel } from "../models/Course";
import { protect, authorize } from "../middleware/auth";

const courseRoutes = Router({ mergeParams: true });

courseRoutes
  .route("/")
  .get(
    advancedResults(CourseModel, {
      path: "bootcamp",
      select: "name description",
    }),
    getCourses
  )
  .post(protect, authorize("publisher", "admin"), addCourse);

courseRoutes
  .route("/:id")
  .get(getCourse)
  .put(protect, updateCourse)
  .delete(protect, authorize("publisher", "admin"), deleteCourse);

export { courseRoutes };
