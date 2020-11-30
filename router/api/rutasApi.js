let express = require('express');
let router = express.Router();


let rutasController = require('../../controller/api/rutas');
let asignarRutasController = require('../../controller/api/asignarRuta');
router.get('/', rutasController.getAll);
router.get('/:id', rutasController.getOne)


// asignar rutas
router.get('/conductorByRuta/:id', asignarRutasController.getConductorsByRoute)
router.get('/asignar/getall', asignarRutasController.getAll)
module.exports = router;