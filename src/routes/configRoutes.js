const express = require('express');
const router = express.Router();
const configController = require('../controllers/configController');

router.get('/vulnerable', configController.getErrorVulnerable);
router.get('/secure', configController.getErrorSecure);

module.exports = router;