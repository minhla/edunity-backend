import coursesCollection from "../instance.js";
import { handleSearchResponse } from "./helpers.js";

const PER_PAGE_LIMIT = 12;

const searchCourses = async (req, res) => {
  try {
    const query = req.query;
    const { keywords, category, page = 1 } = query;
    const normalizedPageValue = parseInt(page) || 1;
    const skipValue = (normalizedPageValue - 1) * PER_PAGE_LIMIT;
    const pipeline = [];

    if (keywords) {
      pipeline.push({
        $search: {
          index: "default",
          text: {
            query: keywords,
            path: {
              wildcard: "*",
            },
          },
        },
      });
    }

    if (category) {
      const decodedCategory = decodeURIComponent(category);
      const categoryRegexMatch = new RegExp(`^${decodedCategory}$`, "i");
      pipeline.push({
        $match: {
          categories: { $regex: categoryRegexMatch },
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
