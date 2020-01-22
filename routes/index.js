import { bootcampRoutes } from "./bootcamps";
import { courseRoutes } from "./courses";
import { url } from "./constant";

export function routes(app) {
  app.use(url.api + "/bootcamps", bootcampRoutes);
  app.use(url.api + "/courses", courseRoutes);
}
