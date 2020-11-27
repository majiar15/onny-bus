const express = require('express');
const router = express.Router();
const rutaController = require('../controller/rutaController')
const asignarRutaController = require('../controller/asignarRutaController');
const { route } = require('./api/rutasApi');


router.get('/registro', (req, res) => res.render('./rutas/registroRutas', {type:'registro'}));
router.post('/registro', rutaController.register );

router.get('/page/:num_page',rutaController.home);

router.get('/update/:id', rutaController.updateGet)

router.post('/update', rutaController.update)

router.get('/remove/:id', rutaController.remove);

// asignamiento de rutas

router.get('/asignar', asignarRutaController.asignarGet);

router.post('/asignar', asignarRutaController.asignar)

router.get('/asignar/page/:num_page', asignarRutaController.home );

router.get('/asignar/update/:id', asignarRutaController.updateGet );

router.post('/asignar/update/', asignarRutaController.update)

router.get('/asignar/remove/:id', asignarRutaController.remove);
module.exports = router;
