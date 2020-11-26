const express = require('express');
const router = express.Router();
const rutaController = require('../controller/rutaController')
const asignarRutaController = require('../controller/asignarRutaController')

router.get('/asignar', asignarRutaController.home);


router.get('/registro', (req, res) => res.render('./rutas/registroRutas', {type:'registro'}));
router.post('/registro', rutaController.register );

router.get('/page/:num_page',rutaController.home);


router.get('/update/:id', rutaController.updateGet)
router.post('/update', rutaController.update)

router.get('/remove/:id', rutaController.remove);

module.exports = router;