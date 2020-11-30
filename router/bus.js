const express = require('express');
const router = express.Router();
const busController = require('../controller/busController')
router.get('/registro', (req, res) => res.render('./buses/registroBuses', {type:'registro', rol:req.session.userType}));
router.post('/registro', busController.register );

router.get('/page/:num_page',busController.home);


router.get('/update/:id', busController.updateGet)
router.post('/update', busController.update)

router.get('/remove/:id', busController.remove);

module.exports = router;