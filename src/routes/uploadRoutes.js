const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadController = require('../controllers/uploadController');

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: 'src/public/uploads/',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

// Versión Vulnerable
router.get('/vulnerable', (req, res) => uploadController.getUploadVulnerable(req, res));
router.post('/vulnerable', upload.single('myFile'), (req, res) => uploadController.postUploadVulnerable(req, res));

// Versión Segura
router.get('/secure', (req, res) => uploadController.getUploadSecure(req, res));
router.post('/secure', upload.single('myFile'), (req, res) => uploadController.postUploadSecure(req, res));

module.exports = router;