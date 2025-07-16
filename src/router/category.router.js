const express = require("express");
const { createCategory, getCategories, deleteCategory } = require("../controller/category.controller");
const { isSeller, isAuthenticated } = require("../middleware/auth");

const router = express.Router();
router.post("/",isAuthenticated,isSeller,createCategory)
router.get("/",getCategories)
router.delete("/id",isAuthenticated,isSeller,deleteCategory)


module.exports = router;
