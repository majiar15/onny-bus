const express = require('express');
const router = express.Router();
const asignarRutaController = require('../controller/asignarRutaController');


// asignamiento de rutas

router.get('/asignar', asignarRutaController.asignarGet);

router.post('/asignar', asignarRutaController.asignar)

router.get('/asignar/page/:num_page', asignarRutaController.home );

router.get('/asignar/update/:id', asignarRutaController.updateGet );

router.post('/asignar/update/', asignarRutaController.update)

router.get('/asignar/remove/:id', asignarRutaController.remove);

module.exports = router;
