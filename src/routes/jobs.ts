import { Router } from "express";
import {
  createJob,
  deleteJob,
  updateJob,
  getJob,
  getAllJobs,
  showStats,
  generateCoverLetter,
} from "../controllers/jobs";

const router = Router();
router.route("/").post(createJob).get(getAllJobs);
router.route("/stats").get(showStats);
router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);
router.route("/generate-cover-letter").post(generateCoverLetter);

export default router;
