import { Response } from "express";
import { AuthRequest } from "../../types/auth/interface";
import Job from "../../models/Job";
import { StatusCodes } from "http-status-codes";
import paramsBuilder from "../../utils/helpers/requests/paramBuilder";

const getAllJobs = async (req: AuthRequest, res: Response) => {
  const queryObject = {
    createdBy: req.user?.userId,
  };
  const result = await paramsBuilder(Job, req.query, queryObject);

  res.status(StatusCodes.OK).json({
    statusCode: StatusCodes.OK,
    message: "Jobs found successfully",
    ...result,
  });
};

export default getAllJobs;
