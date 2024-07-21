const router = require('express').Router();
const authService = require('../services/authService');
const { isAuthorized } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');


router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    
    try {
        if (req.body.password == '') {
            throw new Error('Password is required!')
        }
        if(req.body.password.length < 4){ 
            throw new Error('Password must be at least 4 characters long!');
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match!');
        }
     
       const token = await authService.register(req.body.username, req.body.email, req.body.password);
      console.log(req.body);
        res.cookie('auth', token);
      
        res.redirect('/');

    } catch (error) {
        res.render('auth/register', {
            email: req.body.email,
            username: req.body.username,
            error: getErrorMessage(error)
        });
    }
});


router.get('/login', (req, res) => {
    res.render('auth/login');
});


router.post('/login', async (req, res) => {

    try {
        const token = await authService.login(req.body.username, req.body.password);
        res.cookie('auth', token);
        res.redirect('/');

    } catch (error) {
        console.error(error);
        return res.render('auth/login', {
            username: req.body.username,
            error: getErrorMessage(error)
        });
    }
});

router.get('/logout', isAuthorized, (req, res) => {

    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router