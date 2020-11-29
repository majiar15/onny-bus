let express = require('express');
let router = express.Router();


let notificacionesController = require('../../controller/api/notificaciones');

router.post('/robo', notificacionesController.notificaciones_robo);
router.post('/retrazo', notificacionesController.notificaciones_trancon);
router.post('/visto', notificacionesController.visto);
module.exports = router;