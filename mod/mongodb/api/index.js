import express from "express";

import deleteCourse from "./delete.js";
import createCourse from "./create.js";
import searchCourses from "./search.js";

const coursesRouter = express.Router();

coursesRouter.use(express.json());

coursesRouter.get("/search", searchCourses);

coursesRouter.post("/create", createCourse);

coursesRouter.delete("/delete/:id", deleteCourse);

export default coursesRouter;
