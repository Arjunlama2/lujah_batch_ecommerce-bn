const express = require("express");
const { isAuthenticated, isSeller, isBuyer } = require("../middleware/auth");
const { getOwnOrder, createOrder } = require("../controller/order.controller");

const router = express.Router();

router.get("/",isAuthenticated,isBuyer,getOwnOrder );
router.get("/seller",isAuthenticated,isSeller,getOwnOrder );
router.post("/",isAuthenticated,isBuyer,createOrder)

module.exports = router;
 