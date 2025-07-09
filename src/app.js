const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());












app.get("/", (eeq, res) => {
  res.send("Hello! Server is active");
});

module.exports = app;
