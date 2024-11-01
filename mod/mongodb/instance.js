import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";

const { CONNECT_USERNAME, CONNECT_PASSWORD, ATLAS_DATABASE_URL, DATABASE_NAME, COLLECTION_NAME } = process.env;

const uri = `mongodb+srv://${CONNECT_USERNAME}:${CONNECT_PASSWORD}@${ATLAS_DATABASE_URL}/`;

const client = new MongoClient(uri);

const database = client.db(DATABASE_NAME);

const collection = database.collection(COLLECTION_NAME);

export default collection;