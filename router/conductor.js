const express = require('express');
const router = express.Router();
const conductorController = require('../controller/conductorController');


router.get('/page/:num_page',conductorController.home);
router.get('/registro', (req,res) =>{res.render('./conductor/registroConductores')});

router.post('/registro', conductorController.register);

module.exports = router;