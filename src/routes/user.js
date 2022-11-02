const express = require("express");
const router = express.Router();
const userController = require("../controllers");
const middleware = require("../helper/middleware");

router.get("/", userController.user.read);
router.put("/", userController.user.update);
router.delete("/", userController.user.delete);

module.exports = router;
