const express = require('express');
const router = express.Router();


router.get('/', (req, res) => res.render('./alertas/alertas'));

module.exports = router;