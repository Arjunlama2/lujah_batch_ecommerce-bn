const express = require("express");
const cors = require("cors");
const app = express();
const routes=require("./router/index");
const { handleError } = require("./middleware/error");
app.use(cors());
app.use(express.json());
app.use("/api/v1",routes)

app.use(handleError)










app.get("/", (eeq, res) => {
  res.send("Hello! Server is active");
});

module.exports = app;
