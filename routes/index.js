import { bootcampRoutes } from "./bootcamps";
import { courseRoutes } from "./courses";
import { url } from "./constant";
import { authRoutes } from "./auth";

export function routes(app) {
  app.use(url.api + "/bootcamps", bootcampRoutes);
  app.use(url.api + "/courses", courseRoutes);
  app.use(url.api + "/auth", authRoutes);
}
