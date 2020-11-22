const express = require('express');
const router = express.Router();
const conductorController = require('../controller/conductorController');


router.get('/',conductorController.home);


router.post('/registro', conductorController.register);

module.exports = router;