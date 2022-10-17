const { user } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  registerUser: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const existUser = await user.findOne({
        where: { username: username },
      });
      if (existUser) {
        return res.status(409).json({
          status: false,
          message: "Username already used",
        });
      }
      const encryptedPass = await bcrypt.hash(password, 10);
      const encryptedUser = await user.create({
        username,
        password: encryptedPass,
      });

      return res.status(201).json({
        status: "OK",
        message: "Register user success",
        data: {
          user: encryptedUser,
        },
      });
    } catch {
      next(err);
    }
  },
};
