import express from "express";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error-handler.middleware";

// creating an express app
const app = express();

// adding middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// defining the routes

//error handler middleware
app.use(errorHandler);

// exporting the app
export default app;
