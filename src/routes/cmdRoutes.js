const express = require('express');
const router = express.Router();
const cmdController = require('../controllers/cmdController');

router.get('/', cmdController.getCmdSecure);

module.exports = router;