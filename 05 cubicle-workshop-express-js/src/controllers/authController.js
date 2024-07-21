const router = require('express').Router();  // modular router

const authServece = require('../services/authService');
const { parseMongooseError } = require('../utils/errorUtils');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await authServece.login(username, password);
        res.cookie('auth', token, { httpOnly: true });

    } catch (err) {
        console.log(err.message);
        return res.render('auth/login', { error: err.message });
    }
    res.redirect('/');
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res, next) => {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        return next(new Error('Passwords Missmatch!'));
        // return res.render('auth/register', { error: 'Password Missmatch!' });
    }
    const existingUser = await authServece.getUserByName(username);

    if (existingUser) {
        return res.render('auth/register', { error: 'User already exists!' });
    }
    try {
        const user = await authServece.register(username, password);
        console.log(user);

    } catch (err) {
       const errors = parseMongooseError(err); 
        return res.render('auth/register', { error: errors[0] });
        //return next(err);
    }

    res.render('/login');
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});


module.exports = router;