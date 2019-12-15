import { bootcampRoutes } from "./bootcamp";
import { url } from "./constant";

export function routes(app) {
  app.use(url.api + "/bootcamps", bootcampRoutes);
}
