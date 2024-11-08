import coursesCollection from "../instance.js";

const createCourse = async (req, res) => {
  try {
    const { params } = req.body;
    if (typeof params !== "object" || Object.keys(params).length === 0) {
      return res.status(400).send({ message: "Bad request" });
    }
    const { title, categories, price, rating, coverImage } = params;
    // TODO: Could add AJV here later to validate the schema of the JSON passed from the client
    if (!title || !categories || !price || !rating || !coverImage) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const formattedCategories = categories
      .split(",")
      .map((category) => category.trim());

    const insertResponse = await coursesCollection.insertOne({
      title,
      categories: formattedCategories,
      price: parseInt(price * 100),
      rating: parseFloat(rating),
      coverImage,
      createdAt: new Date(),
    });

    const { insertedId } = insertResponse;
    return res.status(200).send({ id: insertedId });
  } catch (error) {
    console.error("create-course-failed:", error);
    res.status(500).send({ message: "Unexpected error" });
  }
};

export default createCourse;
