const express = require('express');
const router = express.Router();
const idorController = require('../controllers/idorController');

router.get('/', idorController.getIdorSecure);

module.exports = router;