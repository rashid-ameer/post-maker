import { NextFunction, Request, RequestHandler, Response } from "express";
import ApiError from "../lib/api-error";
import PostModel from "../models/posts.models";

// create a post
export const createPost: RequestHandler = async (req, res) => {
  const { title, content } = req.body;
  // validate a request
  if (!title || !content) {
    throw new ApiError(400, "Title and content are required");
  }
  // call a service
  const post = await PostModel.create({ title, content });

  // send response
  res.status(201).json({ post });
};
