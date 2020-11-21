const express = require('express');
const router = express.Router();

router.get('/asignar', (req, res) => res.render('./rutas/asignarRuta'));

module.exports = router;