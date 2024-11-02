import coursesCollection from "../instance.js";

const getCategories = async (req, res) => {
  try {
    const categories = await coursesCollection
      .aggregate([
        {
          $unwind: "$categories",
        },
        {
          $group: {
            _id: "$categories",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
        {
          $limit: 6,
        },
        {
          $project: {
            categoryName: "$_id",
            count: 1,
            _id: 0,
          },
        },
      ])
      .toArray();

    res.status(200).send({ categories });
  } catch (error) {
    console.error("get-categories-error", error);
    res.status(500).send({ message: "Unexpected error" });
  }
};

export default getCategories;
