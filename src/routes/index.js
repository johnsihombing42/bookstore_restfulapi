const express = require("express");
const user = require("./user");
const auth = require("./auth");
const book = require("./book");
const router = express.Router();

router.use("/user", user);
router.use("/auth", auth);
router.use("/book", book);

module.exports = router;
