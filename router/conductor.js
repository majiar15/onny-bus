const express = require('express');
const router = express.Router();
const conductorController = require('../controller/api/conductor');


router.get('/', (req, res) => res.render('./conductor/conductores'));

router.get('/registro', (req, res) => res.render('./conductor/registroConductores'));

router.post('/registro', conductorController.register);

module.exports = router;