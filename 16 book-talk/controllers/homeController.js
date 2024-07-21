const router = require('express').Router();
const booksService = require('../services/booksService');


router.get('/', async (req, res) => {
const books = await booksService.getAll();
  res.render('home', { books });
});



module.exports = router;
