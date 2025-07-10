const express = require("express");
const cors = require("cors");
const app = express();
const routes=require("./router/index")
app.use(cors());
app.use(express.json());
app.use(routes)









app.get("/", (eeq, res) => {
  res.send("Hello! Server is active");
});

module.exports = app;
