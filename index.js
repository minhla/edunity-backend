import dotenv from "dotenv";
dotenv.config();
import express from "express";

import coursesRouter from "./mod/mongodb/api/index.js";
import "./mod/cron/index.js";

const app = express();

app.use("/api/courses", coursesRouter);

app.get("/", (req, res) => {
  res.send("Edunity Backend API Server");
});

// Error handler for routes that don't exist
app.use((req, res) => {
  res.status(404).send({ message: "Not Found" });
});

const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
