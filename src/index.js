const dotenv = require("dotenv");
dotenv.config({quiet:true});
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" Database connected");
    app.listen(PORT, () => {
      console.log(` Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });
