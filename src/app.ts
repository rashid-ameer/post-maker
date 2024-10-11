import express from "express";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error-handler.middleware";
import authenticate from "./middleware/authenticate.middleware";
import authRouter from "./routes/auth.routes";
import postsRouter from "./routes/posts.routes";
import userRouter from "./routes/user.routes";

// creating an express app
const app = express();

// adding middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// defining the routes
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/posts", postsRouter);

//error handler middleware
app.use(errorHandler);

// exporting the app
export default app;
