const express = require('express');
const router = express.Router();
const alertaController = require('../controller/alertaController');
// (req, res) => res.render('./alertas/alertas')
router.get('/page/:num_page', alertaController.home);

module.exports = router;