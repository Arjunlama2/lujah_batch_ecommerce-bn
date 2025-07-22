const express = require("express");
const { isAuthenticated, isSeller } = require("../middleware/auth");
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/product.controller");
const upload = require("../utils/multer");

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", isAuthenticated, isSeller,upload.single("image"), createProduct);


router.get("/:id",getSingleProduct );
router.patch("/:id",isAuthenticated,isSeller,updateProduct);
router.delete("/:id",isAuthenticated,isSeller,deleteProduct);

module.exports = router;
 