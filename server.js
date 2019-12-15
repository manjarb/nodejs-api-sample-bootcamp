import dotenv from "dotenv";
dotenv.config({
  path: "./config/config.env"
});

import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
