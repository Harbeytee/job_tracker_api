import { Response } from "express";
import { AuthRequest } from "../../types/auth/interface";
import Job from "../../models/Job";
import { StatusCodes } from "http-status-codes";

const createJob = async (req: AuthRequest, res: Response) => {
  req.body.createdBy = req.user?.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({
    statusCode: StatusCodes.OK,
    message: "Job created successfully",
    data: job,
  });
};

export default createJob;
