import express from "express";
import { validateRequest } from "../middleware/validateRequestMiddleware.js";
import { registerSchema, loginSchema } from "../validators/authValidator.js";
import { register, login, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchema), login);
router.post("/logout", logout);

export default router;
