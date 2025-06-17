import { Router } from "express";
const router = Router();
import authenticationMiddleware from "../middleware/authentication";
import authRoutes from "./auth";
import jobRoutes from "./jobs";

router.use("/auth", authRoutes);
router.use("/jobs", authenticationMiddleware, jobRoutes);

export default router;
