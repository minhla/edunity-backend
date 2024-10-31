import db from "./mod/mongodb/instance.js";
import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
