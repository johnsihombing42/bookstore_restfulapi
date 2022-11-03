const express = require("express");
const router = express.Router();
const userController = require("../controllers");
const middleware = require("../helper/middleware");

router.post("/", userController.book.create);

module.exports = router;
