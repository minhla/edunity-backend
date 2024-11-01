import axios from "axios";
import csvParser from "csv-parser";
import { Readable } from "stream";

import coursesCollection from "../instance.js";

const { MOCKAROO_RESOURCE_NAME, MOCKAROO_API_KEY } = process.env;

const fetchCsv = async (url) => {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  return response.data;
};

const parseCsvData = (csvDataBuffer, createdAt) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const stream = Readable.from(csvDataBuffer);

    stream
      .pipe(csvParser())
      .on("data", (data) => results.push({ ...data, createdAt }))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
};

export const fetchCoursesAndInsertIntoDb = async () => {
  const createdAt = new Date();
  const csvDataBuffer = await fetchCsv(
    `https://my.api.mockaroo.com/${MOCKAROO_RESOURCE_NAME}?key=${MOCKAROO_API_KEY}`
  );

  const jsonData = await parseCsvData(csvDataBuffer, createdAt);

  const insertManyResponse = await coursesCollection.insertMany(jsonData);

  return insertManyResponse;
};

// Note: This endpoint is only being used in development
export const addCourses = async (req, res) => {
  try {
    await fetchCoursesAndInsertIntoDb();

    res.status(200).send({ message: "Success" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Unexpected error" });
  }
};

