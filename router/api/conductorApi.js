let express = require('express');
let router = express.Router();


let conductorController = require('../../controller/api/conductor');

router.post('/login', conductorController.login);


module.exports = router;