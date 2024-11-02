import coursesCollection from "../instance.js";

const DEFAULT_LIMIT = 6;

const getTopRatedCourses = async (req, res) => {
  try {
    const { limit = DEFAULT_LIMIT } = req.query;
    const parsedLimit = parseInt(limit);
    const topRatedCouse = await coursesCollection
      .aggregate([
        {
          $sort: { rating: -1 },
        },
        {
          $limit: parsedLimit,
        },
      ])
      .toArray();
    res.status(200).send({ data: topRatedCouse });
  } catch (error) {
    console.error("get-top-rated-courses-failed:", error);
    res.status(500).send({ message: "Unexpected error" });
  }
};

export default getTopRatedCourses;
