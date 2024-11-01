import { ObjectId } from "mongodb";

import coursesCollection from "../instance.js";

const deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send({ message: "ID is required" });
    }

    await coursesCollection.deleteOne({ _id: new ObjectId(id) });

    res.status(200).send({ message: "Success" });
  } catch (error) {
    console.error("delete-course-failed:", error);
    res.status(500).send({ message: "Unexpected error" });
  }
};

export default deleteCourse;
