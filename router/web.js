const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('index'));
router.get('/alertas', (req, res) => res.render('./alertas/alertas'));
router.get('/asignar/rutas', (req, res) => res.render('./rutas/asignarRuta'));
router.get('/conductores', (req, res) => res.render('./conductor/conductores'));
router.get('/registro/conductores', (req, res) => res.render('./conductor/registroConductores'));
router.get('/registro/buses', (req, res) => res.render('./buses/registroBuses'));
router.get('/login', (req, res) => res.render('login'));
router.get('/logout', (req, res) => res.render('login'));

module.exports = router;