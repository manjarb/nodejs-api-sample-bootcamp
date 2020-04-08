import path from "path";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import "colors";
import fileupload from "express-fileupload";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import cors from "cors";

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

// Sanitize Data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

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
