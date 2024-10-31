const express = require('express');
const router = express.Router();

const addBookController = require('../controllers/addBookController');
const editBookController = require('../controllers/editBookController');
const deleteBookController = require('../controllers/deleteBookController');
const showBooksController = require('../controllers/showBooksController');
const paginateBooksController = require('../controllers/paginateBooksController');

router.get('/', (req, res) => {
  res.render('index', { title: 'Welcome to the Book App' });
});

router.get('/books/add', addBookController.renderAddBook);
router.post('/books', addBookController.addBook);

router.get('/books', showBooksController.getBooks);

router.get('/books/edit/:title', editBookController.renderEditBook);
router.post('/books/update', editBookController.updateBook);

router.post('/books/delete', deleteBookController.deleteBook);

router.get('/books/paginate', paginateBooksController.paginateBooks);

module.exports = router;
