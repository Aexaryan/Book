const Book = require('../models/Book');

exports.renderAddBook = (req, res) => {
  res.render('add-book', { title: 'Add New Book' });
};

exports.addBook = async (req, res, next) => {
  const { title, author, pages, publishedDate, genres } = req.body;
  try {
    const newBook = new Book({
      title,
      author,
      pages,
      publishedDate: new Date(publishedDate),
      genres: genres.split(',').map(genre => genre.trim())
    });
    await newBook.save();
    res.redirect('/books');
  } catch (error) {
    next(error);
  }
};
