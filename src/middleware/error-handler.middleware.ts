import { ErrorRequestHandler } from "express";
import ApiError from "../lib/api-error";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({
      message: err.message,
      errorCode: err.errorCode,
    });

    return;
  }

  res.status(500).json({
    message: "Internal Server Error",
  });
};

export default errorHandler;
