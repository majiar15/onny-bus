const express = require('express');
const router = express.Router();

router.get('/asignar', (req, res) => res.render('./rutas/asignarRuta'));


router.get('/registro', (req, res) => res.render('./rutas/registroRutas', {type:'registro'}));
router.post('/registro', busController.register );

router.get('/page/:num_page',busController.home);


router.get('/update/:id', busController.updateGet)
router.post('/update', busController.update)

router.get('/remove/:id', busController.remove);

module.exports = router;