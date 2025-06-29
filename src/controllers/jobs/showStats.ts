import { Types } from "mongoose";
import { StatusCodes } from "http-status-codes";
import { AuthRequest } from "../../types/auth/interface";
import { Response } from "express";
import getMonthlyStats from "../../utils/helpers/jobs/getMonthlyStats";
import getWeeklyStats from "../../utils/helpers/jobs/getWeeklyStats";
import getDefaultStats from "../../utils/helpers/jobs/getDefaultStats";

const showStats = async (req: AuthRequest, res: Response) => {
  const userId = new Types.ObjectId(req.user?.userId);

  const defaultStats = await getDefaultStats(userId);
  const monthlyApplications = await getMonthlyStats(userId);
  const weeklyApplications = await getWeeklyStats(userId);

  res.status(StatusCodes.OK).json({
    statusCode: StatusCodes.OK,
    message: "Job stats found successfully",
    data: {
      defaultStats,
      monthlyApplications,
      weeklyApplications,
    },
  });
};

export default showStats;
