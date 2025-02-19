const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const housingController = require('./controllers/housingController');


router.use(homeController);
router.use(authController);
router.use(housingController);

router.get('*', (req, res) =>{
    res.render('home/404')
});


module.exports = router;