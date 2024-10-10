import { Router } from "express";
import { createPost } from "../controllers/posts.controller";

// creating router
const router = Router();

// defining routes
router.post("/create", createPost);
