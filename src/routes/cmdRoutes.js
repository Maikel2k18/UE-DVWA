const express = require('express');
const router = express.Router();
const cmdController = require('../controllers/cmdController');

router.get('/vulnerable', cmdController.getCmdVulnerable);
router.get('/secure', cmdController.getCmdSecure);

module.exports = router;