import express from "express";

import deleteCourse from "./delete.js";
import createCourse from "./create.js";
import searchCourses from "./search.js";
import { addCourses } from "./add.js";
import getCategories from "./categories.js";
import getTopRatedCourses from "./rate.js";

const isDev = process.env.NODE_ENV === "development";

const coursesRouter = express.Router();

coursesRouter.use(express.json());

if (isDev) {
  coursesRouter.post("/add", addCourses);
}

coursesRouter.get("/categories", getCategories);

coursesRouter.get("/rated", getTopRatedCourses);

coursesRouter.get("/search", searchCourses);

coursesRouter.post("/create", createCourse);

coursesRouter.delete("/delete/:id", deleteCourse);

export default coursesRouter;
