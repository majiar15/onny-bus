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
function protectRoutesAdmin(req, res, next) {
    if (req.session.userType != 'admin') {
        res.redirect('/');
    } else {
        next();
    }
}

router.get('/',  redirectLogin, (req, res) =>{ res.render('index', {rol:req.session.userType})});
router.get('/login', redirectHome, (req, res) => res.render('login', {rol:req.session.userType}));


router.post('/login', redirectHome, administradorController.login);


router.get('/logout', administradorController.logout);

router.get('/administrador/registro',redirectLogin,  protectRoutesAdmin, (req, res) => res.render('./administrador/registerAdministrador',{type: "registro", rol: req.session.userType}))
router.post('/administrador/registro',redirectLogin,protectRoutesAdmin, administradorController.register);


router.get('/administrador/page/:num_page',redirectLogin,protectRoutesAdmin,administradorController.home);

router.get('/administrador/update/:id',redirectLogin,protectRoutesAdmin, administradorController.updateGet)
router.post('/administrador/update', redirectLogin,protectRoutesAdmin, administradorController.update)

router.get('/administrador/remove/:id', administradorController.remove);


module.exports = router;