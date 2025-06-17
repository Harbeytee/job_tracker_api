import { Router } from "express";
import {
  signUp,
  signIn,
  googleAuth,
  forgotPassword,
  resetPassword,
} from "../controllers/auth";
const router = Router();

router.post("/google", googleAuth);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:userId", resetPassword);

export default router;
