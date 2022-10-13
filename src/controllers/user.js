const { user } = require("../db/models");

module.exports = {
  get: (req, res, next) => {
    return res.status(200).json({
      status: true,
      message: "Halo",
    });
  },
};
