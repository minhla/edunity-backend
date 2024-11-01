import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";

const {
  CONNECT_USERNAME,
  CONNECT_PASSWORD,
  ATLAS_DATABASE_URL,
  DATABASE_NAME,
  COURSES_COLLECTION_NAME,
} = process.env;

const uri = `mongodb+srv://${CONNECT_USERNAME}:${CONNECT_PASSWORD}@${ATLAS_DATABASE_URL}/`;

const client = new MongoClient(uri);

const database = client.db(DATABASE_NAME);

const coursesCollection = database.collection(COURSES_COLLECTION_NAME);

export default coursesCollection;
