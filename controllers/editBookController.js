const Book = require('../models/Book');
exports.renderEditBook = async (req, res, next) => {
  const title = decodeURIComponent(req.params.title);
  try {
    const book = await Book.findOne({ title });
    if (!book) {
      return res.status(404).send(`No book found with the title "${title}"`);
    }
    const formattedBook = {
      ...book.toObject(),
      publishedDate: book.publishedDate ? book.publishedDate.toISOString().slice(0, 10) : ''
    };
    res.render('edit-book', { title: 'Edit Book', book: formattedBook });
  } catch (error) {
    next(error);
  }
};
exports.updateBook = async (req, res, next) => {
  const { oldTitle, title, author, pages, publishedDate, genres } = req.body;
  try {
    const result = await Book.updateOne(
      { title: { $regex: new RegExp(`^${oldTitle}$`, 'i') } },
      {
        title, author, pages,publishedDate: new Date(publishedDate), 
        genres: genres.split(',').map(genre => genre.trim())
      }
    );
    if (result.nModified > 0) {
      res.send(`Successfully updated the book "${oldTitle}" to "${title}".`);
    } else if (result.matchedCount > 0) {
      res.send(`No changes were made to the book "${oldTitle}".`);
    } else {
      res.send(`No book found with the title "${oldTitle}".`);
    }
  } catch (error) {
    next(error);
  }
};
