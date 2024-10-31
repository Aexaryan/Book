const Book = require('../models/Book');

exports.deleteBook = async (req, res, next) => {
  const { title } = req.body;
  try {
    const result = await Book.deleteOne({ title });
    if (result.deletedCount > 0) {
      res.send(`Successfully deleted the book titled "${title}".`);
    } else {
      res.send(`No book found with the title "${title}".`);
    }
  } catch (error) {
    next(error);
  }
};
