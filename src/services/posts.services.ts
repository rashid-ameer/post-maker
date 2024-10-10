import { HTTP_CODE } from "../constants/http-codes";
import ApiError from "../lib/api-error";
import PostModel from "../models/posts.models";

/**
 *
 * @param {title, content}
 * @returns post
 */
type CreatePost = {
  title: string;
  content: string;
};

export const createPost = async ({ title, content }: CreatePost) => {
  const post = await PostModel.create({ title, content });
  return post;
};

/**
 *
 * @param id
 */
export const deletePost = async (id: string) => {
  await PostModel.findByIdAndDelete(id);
};

/**
 *
 * @param id
 * @param {title, content}
 * @returns
 */

type UpdatePost = {
  id: string;
  title?: string;
  content?: string;
};

export const updatePost = async ({ id, title, content }: UpdatePost) => {
  const post = await PostModel.findById(id);
  if (!post) {
    throw new ApiError(HTTP_CODE.NOT_FOUND, "Post not found");
  }

  post.title = title || post.title;
  post.content = content || post.content;

  const newPost = await post.save();
  return newPost;
};

/**
 *
 * @returns all posts
 */
export const getAllPosts = async () => {
  return await PostModel.find();
};

export const getPost = async (id: string) => {
  const post = await PostModel.findById(id);
  if (!post) {
    throw new ApiError(HTTP_CODE.NOT_FOUND, "Post not found");
  }
  return post;
};
