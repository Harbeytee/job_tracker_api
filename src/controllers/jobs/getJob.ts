import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthRequest } from "../../types/auth/interface";
import { NotFoundError } from "../../utils/errors";
import Job from "../../models/Job";

const getJob = async (req: AuthRequest, res: Response) => {
  const {
    user,
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: user?.userId,
  });

  if (!job) {
    throw new NotFoundError(`No job found with id ${jobId}`);
  }
  res
    .status(StatusCodes.OK)
    .json({
      statusCode: StatusCodes.OK,
      message: "Job found successfully",
      data: job,
    });
};

export default getJob;
