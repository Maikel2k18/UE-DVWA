const express = require('express');
const router = express.Router();
const storedController = require('../controllers/storedXssController');

router.get('/vulnerable', storedController.getStoredVulnerable);
router.post('/vulnerable', storedController.postStoredVulnerable);

router.get('/', storedController.getStoredSecure);
router.post('/', storedController.postStoredSecure);

module.exports = router;