import cron from "node-cron";

import coursesCollection from "../mongodb/instance.js";
import { fetchCoursesAndInsertIntoDb } from "../mongodb/api/add.js";

const EVERY_10_MINUTES = "*/10 * * * *";

cron.schedule(EVERY_10_MINUTES, async () => {
  console.info("Running cron job");

  await coursesCollection.deleteMany({});
  console.info("Deleted all courses");

  await fetchCoursesAndInsertIntoDb();
  console.info("Inserted new courses");

  console.info("Cron job completed");
});
