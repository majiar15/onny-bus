let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

let conductorController = require('../../controller/api/conductor');

router.post('/login', conductorController.login);
router.post('/update/ubicacion', vefifyLoginConductor, conductorController.updateLatLong)

function vefifyLoginConductor(req, res, next) {
    jwt.verify(req.headers['x-access-token'], process.env.SECRET_KEY, function(err, decoded) {
        if (err) {
            res.json({ status: 'error', message: err.message, data: null });
        } else {            
            next();
        }
    });
}


module.exports = router;