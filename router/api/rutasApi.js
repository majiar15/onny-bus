let express = require('express');
let router = express.Router();


let rutasController = require('../../controller/api/rutas');

router.get('/getAll', rutasController.getAll);
router.get('/:id', rutasController.getOne)
module.exports = router;