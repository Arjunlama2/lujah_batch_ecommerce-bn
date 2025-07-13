const express = require("express");
const { signup, login } = require("../controller/auth.controller");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

//
router.post("/login", login);
router.post("/signup", signup);
router.get("/me", isAuthenticated, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
