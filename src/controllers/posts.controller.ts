import { NextFunction, Request, Response } from "express";

// create a post
export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  res.status(200).json({ message: "Hello" });
};
