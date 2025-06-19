import { Model } from "mongoose";

interface QueryParam {
  [key: string]: string | number | undefined;
  page?: string | number;
  limit?: string | number;
}

const paramsBuilder = async <T extends Document>(
  model: Model<T>,
  queryParam: QueryParam,
  queryObj: Record<string, any>
) => {
  const queryObject: Record<string, any> = { ...queryObj };
  const sortObject: Record<string, 1 | -1> = {};
  const orConditions: Record<string, any>[] = [];

  // Build query filters
  Object.entries(queryParam).forEach(([key, value]) => {
    //usually used for searching
    if (key.startsWith("filterOr")) {
      const match = key.match(/^filterOr\[(.*?)\]$/);
      const queryKey = match?.[1];
      if (queryKey) {
        orConditions.push({
          [queryKey]: { $regex: value, $options: "i" },
        });
      }
    }
    //for filtering returns all matches
    if (key.startsWith("filter")) {
      const match = key.match(/^filter\[(.*?)\]$/);
      const queryKey = match?.[1];
      if (queryKey) {
        queryObject[queryKey] = value;
      }
    }
    //for sorting filters
    if (key.startsWith("sort")) {
      const match = key.match(/^sort\[(.*?)\]$/);
      const queryKey = match?.[1];
      if (queryKey) {
        sortObject[queryKey] = value === "asc" ? 1 : -1;
      }
    }
  });

  if (orConditions.length > 0) {
    queryObject["$or"] = orConditions;
  }

  const page = Number(queryParam.page) || 1;
  const limit = Number(queryParam.limit) || 10;
  const skip = (page - 1) * limit;

  // Final query chain
  const resultQuery = model
    .find(queryObject)
    .sort(sortObject)
    .skip(skip)
    .limit(limit);

  // Execute the query
  const data = await resultQuery;

  // Count total matching docs
  const total = await model.countDocuments(queryObject);
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    meta: {
      total,
      totalPages,
      page,
      limit,
    },
  };
};

export default paramsBuilder;
