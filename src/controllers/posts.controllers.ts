import { RequestHandler } from "express";
import {
  createPostSchema,
  deletePostSchema,
  getPostSchema,
  updatePostSchema,
} from "../lib/schemas";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "../services/posts.services";
import ApiResponse from "../lib/api-response";
import asyncHandler from "../lib/async-handler";
import { HTTP_CODE } from "../constants/http-codes";

// create a post
export const createPostHanlder: RequestHandler = asyncHandler(
  async (req, res) => {
    // validate a request
    const request = createPostSchema.parse(req.body);

    // call a service
    const post = await createPost(request);

    // send response
    res
      .status(HTTP_CODE.CREATED)
      .json(new ApiResponse("Post created successfully", post));
  }
);

// delete a post
export const deletePostHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    // validate a request
    const request = deletePostSchema.parse(req.params.id);

    // call a servcie
    await deletePost(request);

    // send respnose
    res.status(HTTP_CODE.NO_CONTENT).send();
  }
);

// update a post
export const updatePostHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    // validate a request
    const request = updatePostSchema.parse({ id: req.params.id, ...req.body });

    // call a service
    const post = await updatePost(request);

    // send a response
    res
      .status(HTTP_CODE.OK)
      .json(new ApiResponse("Post updated successfully", post));
  }
);

// get all posts
export const getAllPostsHandler: RequestHandler = asyncHandler(
  async (req, res) => {
    // call a service
    const posts = await getAllPosts();

    //return response
    res
      .status(HTTP_CODE.OK)
      .json(new ApiResponse("Fetched posts successfully", posts));
  }
);

// get post by id
export const getPostHandler: RequestHandler = asyncHandler(async (req, res) => {
  console.log(req.params.id);

  // validate a request
  const request = getPostSchema.parse(req.params.id);

  // call a service
  const post = await getPost(request);

  // send response
  res
    .status(HTTP_CODE.OK)
    .json(new ApiResponse("Fetched post successfully", post));
});
