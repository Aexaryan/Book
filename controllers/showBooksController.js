const Book = require('../models/Book');

exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.render('books', { title: 'Books List', books });
  } catch (error) {
    next(error);
  }
};
