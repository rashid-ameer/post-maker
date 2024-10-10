import { Router } from "express";
import { registerHandler } from "../controllers/user.models";

// create router
const router = Router();

// defining routes
router.post("/register", registerHandler);

// exporting the router
export default router;
