import { Router } from "express";
const router = Router();

const {
  createJob,
  deleteJob,
  updateJob,
  getJob,
  getAllJobs,
} = require("../controllers/jobs");

router.route("/").post(createJob).get(getAllJobs);
router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);

module.exports = router;
