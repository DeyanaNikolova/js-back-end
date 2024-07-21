const authController = require('express').Router();

const { parseError } = require('../util/parser');
const { register, login } = require('../services/userService');




authController.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register Page'
    });
});

authController.post('/register', async (req, res) => {
  
    try {
        if (!req.body.email || !req.body.firstname || !req.body.lastname || !req.body.password) {
            throw new Error('All fields are required!');
        }
        if (req.body.password.length < 5) {
            throw new Error('Passwors mist be at least 5 characters long!');
        }

        if (req.body.password !== req.body.repass) {
            throw new Error('Password missmatch!');
        }
        const token = await register(req.body.email, req.body.firstname, req.body.lastname, req.body.password);
        res.cookie('token', token);
        res.redirect('/');

    } catch (error) {
        const errors = parseError(error);

        res.render('register', {
            title: 'Register Page',
            errors,
            body: {
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,        
            }
        });
    }
});

authController.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login Page'
    });
});

authController.post('/login', async (req, res) => {
    try {
        const token = await login(req.body.email, req.body.password);

        res.cookie('token', token);
        res.redirect('/');

    } catch (error) {
        const errors = parseError(error);
        res.render('login', {
            title: 'Login Page',
            errors,
            body: {
                email: req.body.email
            }
        });
    }
});

authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = authController;