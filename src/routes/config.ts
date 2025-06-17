import express from "express";
import config from "../config/config";

const router = express.Router();

router.get("/env.js", (req, res) => {
  res.setHeader("Content-Type", "application/javascript");
  res.send(`window.__ENV__ = ${JSON.stringify(config)};`);
});

export default router;
