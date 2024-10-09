import express from "express";
import cookieParser from "cookie-parser";

// creating an express app
const app = express();

// adding middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// App health check
app.get("/", (req, res) => {
  res.send("Status: Healthy");
});

// defining the routes

// exporting the app
export default app;
