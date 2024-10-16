import { ErrorRequestHandler } from "express";
import ApiError from "../lib/api-error";
import { HTTP_CODE } from "../constants/http-codes";
import { ZodError } from "zod";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(`Error Method: ${req.method}, Path: ${req.path} `);
  console.log(`Error: ${err}`);

  if (err instanceof ApiError) {
    res.status(err.status).json({
      message: err.message,
      errorCode: err.errorCode,
      success: false,
    });

    return;
  }

  if (err instanceof ZodError) {
    res.status(HTTP_CODE.BAD_REQUEST).json({
      message: err.errors[0].message,
      success: false,
    });

    return;
  }

  res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    success: false,
  });
};

export default errorHandler;
