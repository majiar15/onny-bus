const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('index'));
router.get('/alertas', (req, res) => res.render('alertas'));
router.get('/registro/rutas', (req, res) => res.render('asignarRuta'));
router.get('/registro/conductores', (req, res) => res.render('registroConductores'));
router.get('/registro/buses', (req, res) => res.render('registroBuses'));
router.get('/login', (req, res) => res.render('login'));
router.get('/logout', (req, res) => res.render('login'));

module.exports = router;