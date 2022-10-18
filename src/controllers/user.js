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
};
