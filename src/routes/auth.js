const express = require("express");
const router = express.Router();

const userController = require("../controllers");
const middleware = require("../helper/middleware");

router.post("/register", userController.auth.register);
router.post("/login", userController.auth.login);
router.post("/change-password/:id", userController.auth.changePassword);
module.exports = router;
