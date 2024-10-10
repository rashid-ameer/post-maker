import { Router } from "express";
import { loginHandler, registerHandler } from "../controllers/auth.controller";

// defining router
const router = Router();

// defining routes
router.post("/register", registerHandler);
router.post("/login", loginHandler);

// exporting router
export default router;
