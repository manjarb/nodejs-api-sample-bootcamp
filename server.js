import path from "path";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import "colors";
import fileupload from "express-fileupload";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db";
import { errorHandler } from "./middleware/error";

dotenv.config({
  path: "./config/config.env",
});

const { routes } = require("./routes");

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

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
