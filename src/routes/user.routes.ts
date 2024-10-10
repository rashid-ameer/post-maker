import { Router } from "express";
import { loginHandler, registerHandler } from "../controllers/user.controllers";

// create router
const router = Router();

// defining routes
router.post("/register", registerHandler);
router.post("/login", loginHandler);
// exporting the router
export default router;
