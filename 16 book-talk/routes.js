const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const booksController = require('./controllers/booksController');
const profileController = require('./controllers/profileController');

router.use(homeController);
router.use(authController);
router.use(booksController);
router.use(profileController);

router.all('*', (req, res) =>{
    res.render('home/404');
});


module.exports = router;