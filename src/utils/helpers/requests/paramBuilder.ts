import { Model } from "mongoose";

interface QueryParam {
  [key: string]: any;
  page?: string | number;
  limit?: string | number;
}

const paramsBuilder = async <T extends Document>(
  model: Model<T>,
  queryParam: QueryParam,
  queryObj: Record<string, any>
) => {
  const queryObject = queryObj;
  let sortObject: Record<string, 1 | -1> = {};

  // Build query filters
  Object.entries(queryParam).forEach(([key, value]) => {
    if (key.startsWith("filterOr")) {
      const match = key.match(/^filterOr\[(.*?)\]$/);
      const queryKey = match?.[1];
      if (queryKey) {
        queryObject[queryKey] = value;
      }
    }

    if (key.startsWith("filter")) {
      const match = key.match(/^filter\[(.*?)\]$/);
      const queryKey = match?.[1];
      if (queryKey) {
        queryObject[queryKey] = { $regex: value, $options: "i" };
      }
    }

    if (key.startsWith("order")) {
      const match = key.match(/^order\[(.*?)\]$/);
      const queryKey = match?.[1];
      if (queryKey) {
        sortObject[queryKey] = value === "asc" ? 1 : -1;
      }
    }
  });

  const page = Number(queryParam.page) || 1;
  const limit = Number(queryParam.limit) || 10;
  const skip = (page - 1) * limit;

  // Final query chain
  let resultQuery = model
    .find(queryObject)
    .sort(sortObject)
    .skip(skip)
    .limit(limit);

  // Execute the query
  const data = await resultQuery;

  // Count total matching docs
  const total = await model.countDocuments(queryObject);
  const totalPages = Math.ceil(total / limit);

  return { data, meta: { total, totalPages, page, limit } };
};

export default paramsBuilder;
