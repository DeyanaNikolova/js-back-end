const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const adController = require('./controllers/adController');

router.use(homeController);
router.use(authController);
router.use(adController);


module.exports = router;