import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import Job from "../../models/Job";
import { BadRequestError, NotFoundError } from "../../utils/errors";
import { AuthRequest } from "../../types/auth/interface";

const updateJob = async (req: AuthRequest, res: Response) => {
  const {
    body,
    user,
    params: { id: jobId },
  } = req;

  // Reject update if any value is falsy or n ot a valid string
  for (const [key, value] of Object.entries(body)) {
    if (!value || typeof value !== "string") {
      throw new BadRequestError(`Invalid value for field '${key}'`);
    }
  }

  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: user?.userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job found with id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({
    statusCode: StatusCodes.OK,
    message: "Job updated successfully",
  });
};

export default updateJob;
