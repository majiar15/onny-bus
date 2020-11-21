const express = require('express');
const router = express.Router();
const administradorController = require('../controller/administradorController');

function redirectLogin(req, res, next) {
    console.log(req.session);

    if (!req.session.userId) {
        res.redirect('/login');
    } else {
        next();
    }
}

function redirectHome(req, res, next) {
    if (req.session.userId) {
        res.redirect('/');
    } else {
        next();
    }
}

router.get('/', redirectLogin, (req, res) => res.render('index'));

router.get('/login', redirectHome, (req, res) => res.render('login'));


router.post('/login', redirectHome, administradorController.login);


router.get('/logout', administradorController.logout);

router.post('/register/administrador', redirectLogin, administradorController.register)
module.exports = router;