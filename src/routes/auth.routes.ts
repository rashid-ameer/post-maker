import { Router } from "express";
import {
  loginHandler,
  logoutHandler,
  registerHandler,
} from "../controllers/auth.controller";
import authenticate from "../middleware/authenticate.middleware";

// defining router
const router = Router();

// defining routes
router.post("/register", registerHandler);
router.post("/login", loginHandler);

// auth middleware
router.use(authenticate);
// protected routes
router.get("/logout", logoutHandler);

// exporting router
export default router;
