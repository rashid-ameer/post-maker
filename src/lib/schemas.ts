import { z } from "zod";

// COMMON SCEMAS START
const requiredString = z.string().trim().min(1);
// COMMON SCHEMAS END

// POSTS SCHEMAS START
export const createPostSchema = z.object({
  title: requiredString,
  content: requiredString,
});

export const deletePostSchema = requiredString;

export const updatePostSchema = z.object({
  id: requiredString,
  title: z.string().optional(),
  content: z.string().optional(),
});

export const getPostSchema = requiredString;

// POSTS SCHEMAS END
