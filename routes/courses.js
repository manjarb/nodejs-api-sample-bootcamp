import { Router } from "express";
import { getCourses } from "../controllers/courses";

const courseRoutes = Router({ mergeParams: true });

courseRoutes.route("/").get(getCourses);

export { courseRoutes };
