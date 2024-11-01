import coursesCollection from "../instance.js";
import { handleSearchResponse } from "./helpers.js";

const PER_PAGE_LIMIT = 10;

const searchCourses = async (req, res) => {
  try {
    const query = req.query;
    const { keywords, page = 1 } = query;
    const normalizedPageValue = parseInt(page) || 1;
    const skipValue = (normalizedPageValue - 1) * PER_PAGE_LIMIT;
    const pipeline = [];

    if (keywords) {
      pipeline.push({
        $search: {
          index: "default",
          text: {
            query: query.keywords,
            path: {
              wildcard: "*",
            },
          },
        },
      });
    }

    pipeline.push({
      $facet: {
        data: [
          { $match: {} },
          { $skip: skipValue },
          { $limit: PER_PAGE_LIMIT },
        ],
        meta: [
          {
            $group: {
              _id: null,
              totalItems: { $sum: 1 },
            },
          },
        ],
      },
    });

    const coursesResult = await coursesCollection.aggregate(pipeline).toArray();
    const data = handleSearchResponse({
      response: coursesResult,
      page,
      perPage: PER_PAGE_LIMIT,
    });
    return res.status(200).send(data);
  } catch (error) {
    console.error("search-courses-failed:", error);
    return res.status(500).send({ message: "Unexpected error" });
  }
};

export default searchCourses;
