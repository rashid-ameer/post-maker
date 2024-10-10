import { RequestHandler } from "express";

type AsyncHanlder = (fn: RequestHandler) => RequestHandler;

const asyncHandler: AsyncHanlder = (fn) => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (error) {
    return next(error);
  }
};

export default asyncHandler;
