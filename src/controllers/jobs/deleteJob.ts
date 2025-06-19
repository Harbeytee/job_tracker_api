import { Response } from "express";
import { NotFoundError } from "../../utils/errors";
import { AuthRequest } from "../../types/auth/interface";
import Job from "../../models/Job";
import { StatusCodes } from "http-status-codes";

const deleteJob = async (req: AuthRequest, res: Response) => {
  const {
    user,
    params: { id: jobId },
  } = req;

  const job = await Job.findByIdAndDelete({
    _id: jobId,
    createdBy: user?.userId,
  });

  if (!job) {
    throw new NotFoundError(`No job found with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({
    statusCode: StatusCodes.OK,
    message: "Job deleted successfully",
  });
};

export default deleteJob;
