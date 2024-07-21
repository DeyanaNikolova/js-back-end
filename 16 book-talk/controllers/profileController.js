const router = require('express').Router();
const bookService = require('../services/booksService');
const { isAuthorized } = require('../middlewares/authMiddleware');


router.get('/profile', isAuthorized, async (req, res) => {
  
  const myWhishList = await bookService.getByUserWishlist(req.user._id);

    res.render('profile', { myWhishList });
});


module.exports = router;