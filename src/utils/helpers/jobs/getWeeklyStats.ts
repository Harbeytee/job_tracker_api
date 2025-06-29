import moment from "moment";
import Job from "../../../models/Job";
import { Types } from "mongoose";

export default async function getWeeklyStats(userId: Types.ObjectId) {
  let total = 0;
  const startOfWeek = moment().startOf("isoWeek").toDate();
  const endOfWeek = moment().endOf("isoWeek").toDate();

  const rawWeeklyData = await Job.aggregate([
    {
      $match: {
        createdBy: userId,
        createdAt: { $gte: startOfWeek, $lte: endOfWeek },
      },
    },
    {
      $group: {
        _id: { day: { $dayOfWeek: "$createdAt" } }, // Sunday = 1 ... Saturday = 7
        count: { $sum: 1 },
      },
    },
  ]);

  //Convert raw result to a map for quick lookup
  const dayCountMap = rawWeeklyData.reduce((acc, { _id, count }) => {
    // Adjust day number: MongoDB $dayOfWeek starts at 1 (Sunday),
    // moment().isoWeekday() starts at 1 (Monday) — we'll align with ISO
    const dayIndex = _id.day === 1 ? 7 : _id.day - 1; // Convert Sunday (1) to 7, Mon-Sat stay 1–6
    acc[dayIndex] = count;
    total += count;
    return acc;
  }, {});

  //  Only include days from Monday up to today (e.g., 1 to 5 if today is Friday)
  const todayIso = moment().isoWeekday(); // 1 (Mon) to 7 (Sun)
  const weeklyStats = Array.from({ length: todayIso }, (_, i) => {
    const dayIndex = i + 1; // 1 (Mon) to today
    const dayName = moment().isoWeekday(dayIndex).format("ddd");
    return {
      day: dayName,
      count: dayCountMap[dayIndex] || 0,
    };
  });

  return { total, stats: weeklyStats };
}
