const { book } = require("../db/models");

module.export = {
  create: async (req, res, next) => {
    try {
      const { title, description, author, publisher } = req.body;
      const existBook = await book.findOne({
        where: { title: title },
      });
      if (existBook) {
        return res.status(409).json({
          status: false,
          message: "book already used",
        });
      }

      const newBook = await book.create({
        title,
        desciption,
        author,
        publisher,
      });

      return res.status(200).json({
        status: true,
        message: "Success",
        data: {
          title: newBook.title,
          description: newBook.description,
          author: newBook.author,
          publisher: newBook.publisher,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};