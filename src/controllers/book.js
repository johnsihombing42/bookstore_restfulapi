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
        description,
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

  read: async (req, res) => {
    try {
      const bookData = await book.findAll();
      if (bookData.length <= 0) {
        res.status(404).json({
          status: false,
          message: "data was not-found",
          data: null,
        });
      }

      return res.status(200).json({
        status: "success",
        mesage: "Read all data",
        data: bookData,
      });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res) => {
    try {
      const { title, description, author, publisher } = req.body;
      const { id } = req.params;
      const bookData = await book.findOne({ where: { id: id } });

      if (!bookData) {
        return res.status(400).json({
          status: false,
          message: "Data Not Found",
        });
      }

      return res.status(200).json({
        status: "success",
        mesage: "Update data success",
        data: {
          title,
          description,
          author,
          publisher,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
