import dotenv from "dotenv";
import express from "express";
import { routes } from "./routes";
import morgan from "morgan";

dotenv.config({
  path: "./config/config.env"
});

const app = express();
const PORT = process.env.PORT || 5000;

// Dev Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routers
routes(app);

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
