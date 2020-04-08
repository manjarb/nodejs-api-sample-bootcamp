import { bootcampRoutes } from "./bootcamps";
import { courseRoutes } from "./courses";
import { url } from "./constant";
import { authRoutes } from "./auth";
import { userRoutes } from "./user";
import { reviewRoutes } from "./review";

export function routes(app) {
  app.use(url.api + "/bootcamps", bootcampRoutes);
  app.use(url.api + "/courses", courseRoutes);
  app.use(url.api + "/auth", authRoutes);
  app.use(url.api + "/users", userRoutes);
  app.use(url.api + "/reviews", reviewRoutes);
}
