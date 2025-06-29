import Job from "../../../models/Job";
import { Types } from "mongoose";

export default async function getDefaultStats(userId: Types.ObjectId) {
  let total = 0;
  // Group by status
  let stats = await Job.aggregate([
    { $match: { createdBy: userId } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  const reducedStats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    if (title) acc[title] = count;
    total += count;
    return acc;
  }, {});

  const defaultStats = {
    applied: reducedStats.applied || 0,
    interview: reducedStats.interview || 0,
    accepted: reducedStats.accepted || 0,
    rejected: reducedStats.rejected || 0,
    ghosted: reducedStats.ghosted || 0,
  };

  return { total, stats: defaultStats };
}
