import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import "colors";

import { connectDB } from "./config/db";
import { errorHandler } from "./middleware/error";

dotenv.config({
  path: "./config/config.env"
});

const { routes } = require("./routes");

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Body parser
app.use(express.json());

// Dev Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routers
routes(app);

app.use(errorHandler);

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise Rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Err: ${err.message}`.red);
  server.close(() => {
    process.exit(1);
  });
});
