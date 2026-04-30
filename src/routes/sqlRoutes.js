const express = require('express');
const router = express.Router();
const sqlController = require('../controllers/sqlController');


router.get('/vulnerable', (req, res) => {
    sqlController.getSqlVulnerable(req, res);
});

router.get('/secure', (req, res) => {
    sqlController.getSqlSecure(req, res);
});

module.exports = router;