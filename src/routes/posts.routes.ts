import { Router } from "express";
import {
  createPostHanlder,
  deletePostHandler,
  getAllPostsHandler,
  getPostHandler,
  updatePostHandler,
} from "../controllers/posts.controllers";

// creating router
const router = Router();

// defining routes
router.post("/create", createPostHanlder);
router.delete("/delete/:id", deletePostHandler);
router.put("/update/:id", updatePostHandler);
router.get("/", getAllPostsHandler);
router.get("/:id", getPostHandler);
// export router
export default router;
