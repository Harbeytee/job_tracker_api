import { Response } from "express";
import { AuthRequest } from "../../types/auth/interface";

const getAllJobs = (req: AuthRequest, res: Response) => {
  req.body.createdBy = req.user?.userId;
};

export default getAllJobs;
