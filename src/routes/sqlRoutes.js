const express = require('express');
const router = express.Router();
const sqlController = require('../controllers/sqlController');


router.get('/', (req, res) => {
    sqlController.getSqlSecure(req, res);
});

module.exports = router;