// src/routes/xssRoutes.js
const express = require('express');
const router = express.Router();
const xssController = require('../controllers/xssController');

// Definimos las rutas
router.get('/reflected-vulnerable', xssController.getReflectedVulnerable);
router.get('/reflected-secure', xssController.getReflectedSecure);

// ¡ESTA LÍNEA ES VITAL!
module.exports = router;