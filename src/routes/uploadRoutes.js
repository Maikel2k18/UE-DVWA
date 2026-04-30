const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadController = require('../controllers/uploadController');

const storage = multer.diskStorage({
    destination: 'src/public/uploads/',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

router.get('/', (req, res) => uploadController.getUploadSecure(req, res));
router.post('/', upload.single('myFile'), (req, res) => uploadController.postUploadSecure(req, res));

module.exports = router;