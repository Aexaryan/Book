const Book = require('../models/Book');

exports.paginateBooks = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 2;
  const skip = (page - 1) * limit;

  try {
    const totalBooks = await Book.countDocuments();
    const totalPages = Math.ceil(totalBooks / limit);
    let books = await Book.find()
      .sort({ publishedDate: -1 })
      .skip(skip)
      .limit(limit);

    books = books.map(book => ({
      ...book.toObject(),
      publishedDate: book.publishedDate ? book.publishedDate.toISOString().slice(0, 10) : ''
    }));

    const prevPage = page > 1 ? page - 1 : null;
    const nextPage = page < totalPages ? page + 1 : null;
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push({ page: i, active: i === page });
    }

    res.render('paginate-books', {
      books,
      currentPage: page,
      prevPage,
      nextPage,
      pages
    });
  } catch (error) {
    next(error);
  }
};
