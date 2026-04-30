const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.getLoginSecure);
router.post('/login', authController.postLoginSecure);

module.exports = router;