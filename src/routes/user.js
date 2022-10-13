const express = require("express");
const router = express.Router();
const userController = require("../controllers");
const middleware = require("../helper/middleware");

router.get("/", (req, res) => {
  res.send("Welcome to my project");
});

module.exports = router;
