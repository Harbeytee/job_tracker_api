import moment from "moment";
import Job from "../../../models/Job";
import { Types } from "mongoose";

export default async function getMonthlyStats(userId: Types.ObjectId) {
  let total = 0;
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: userId } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
  ]);

  // Map the aggregation results into an object for quick lookup
  const monthCountMap = monthlyApplications.reduce(
    (acc, { _id: { year, month }, count }) => {
      const key = `${month}-${year}`;
      acc[key] = count;
      total += count;
      return acc;
    },
    {}
  );

  // Merge actual counts into the sixMonths structure
  const monthlyStats = Array.from({ length: 6 }, (_, i) => {
    const date = moment().subtract(i, "months");
    const month = date.month() + 1;
    const year = date.year();
    const key = `${month}-${year}`;
    return {
      date: date.format("MMM Y"),
      count: monthCountMap[key] || 0,
    };
  }).reverse();
  return {
    total,
    stats: monthlyStats,
  };
}
