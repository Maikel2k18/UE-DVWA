const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/vulnerable', authController.getLoginVulnerable);
router.post('/vulnerable', authController.postLoginVulnerable);

router.get('/secure', authController.getLoginSecure);
router.post('/secure', authController.postLoginSecure);

module.exports = router;