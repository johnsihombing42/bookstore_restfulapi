const { user } = require("../db/models");

module.exports = {
  read: async (req, res, next) => {
    try {
      const userData = await user.findAll();
      return res.status(200).json({
        status: "success",
        mesage: "Read all data",
        data: userData,
      });
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const { id } = req.params;
      const newuser = await user.findOne({ where: { id: id } });

      if (!newuser) {
        return res.status(400).json({
          status: false,
          message: "Data Not Found",
        });
      }
      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = await user.update(
        {
          username,
          password: encryptedPassword,
        },
        {
          where: { id: id },
        }
      );
      return res.status(200).json({
        status: "success",
        mesage: "Update data success",
        data: {
          username: user.username,
          password: user.password,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
