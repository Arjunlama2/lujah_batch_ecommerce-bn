const express = require("express");
const { createCategory, getCategories } = require("../controller/category.controller");
const { isSeller, isAuthenticated } = require("../middleware/auth");

const router = express.Router();
router.post("/",isAuthenticated,isSeller,createCategory)
router.get("/",getCategories)

module.exports = router;
