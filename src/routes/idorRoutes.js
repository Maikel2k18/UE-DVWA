const express = require('express');
const router = express.Router();
const idorController = require('../controllers/idorController');

router.get('/vulnerable', idorController.getIdorVulnerable);
router.get('/secure', idorController.getIdorSecure);

module.exports = router;