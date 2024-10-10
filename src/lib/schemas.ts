import { z } from "zod";

// COMMON SCEMAS
const requiredString = z.string().trim().min(1);

// USERS SCHEMAS
export const registerUserSchema = z.object({
  username: requiredString.regex(/^[a-zA-Z0-9_]*$/, {
    message: "Username can only contain letters, numbers, and underscores.",
  }),
  email: requiredString.email(),
  password: z
    .string()
    .min(8, "Password is required")
    .max(20, "Password cannot exceed 20 characters"),
});

export const loginUserSchema = z.object({
  email: z.string().trim().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

// POSTS SCHEMAS
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
