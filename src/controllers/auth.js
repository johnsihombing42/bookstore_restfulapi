const { user } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SIGNATURE_KEY } = process.env;

module.exports = {
  // @DESC Register User
  // @ROUTE /auth/login
  // @METHOD POST
  register: async (req, res, next) => {
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
    } catch (err) {
      next(err);
    }
  },
  //autentikasi login
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const userData = await user.findOne({
        where: { username: username },
      });

      if (!userData) {
        return res.status(400).json({
          status: false,
          message: "email or password doesn't match!",
        });
      }

      const correct = await bcrypt.compare(password, userData.password);
      if (!correct) {
        return res.status(400).json({
          status: false,
          message: "email or password doesn't match!",
        });
      }

      // generate token
      payload = {
        username: user.username,
        password: user.password,
      };
      const token = jwt.sign(payload, JWT_SIGNATURE_KEY);

      return res.status(200).json({
        status: "OK",
        message: "success",
        data: {
          token: token,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  changePassword: async (req, res, next) => {
    try {
      const { oldPassword, newPassword, confirmNewPassword } = req.body;

      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({
          status: false,
          message: "new password and confirm new password doesn't match!",
        });
      }

      const { id } = req.params;

      const userData = await user.findOne({ where: { id: id } });
      if (!userData) {
        return res.status(404).json({
          status: false,
          message: "user not found!",
        });
      }

      const isValidPassword = await bcrypt.compare(
        oldPassword,
        userData.password
      );

      if (!isValidPassword) {
        return res.status(401).json({
          status: false,
          message: "wrong password!",
        });
      }

      const newEncryptedPass = await bcrypt.hash(newPassword, 10);
      await user.update({ password: newEncryptedPass }, { where: { id: id } });
      return res.status(200).json({
        status: "OK",
        message: "success change password",
        data: userData,
      });
    } catch (error) {
      next(error);
    }
  },
};
