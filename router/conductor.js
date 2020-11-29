const express = require('express');
const router = express.Router();
const conductorController = require('../controller/conductorController');


router.get('/page/:num_page',conductorController.home);
router.get('/registro', (req,res) =>{res.render('./conductor/registroConductores', { type: 'registro'})});
router.post('/registro', conductorController.register);

router.get('/update/:id', conductorController.updateGet)
router.post('/update', conductorController.update)

router.get('/remove/:id', conductorController.remove);
module.exports = router;