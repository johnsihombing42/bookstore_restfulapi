const { user } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  registerUser: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const exixtUser = await user.findOne({
        where: { username: username },
      });
      if (existUser) {
        return res.status(409).json({
          status: false,
          message: "Username already used",
        });
      }
    } catch {}
  },
};
