const express = require("express");
const router = express.Router();
const userController = require("../controllers");
const middleware = require("../helper/middleware");

router.post("/register", userController.user.register);
router.post("/login", userController.user.login);
router.post("/change-password/:id", userController.user.changePassword);
module.exports = router;
