const express = require('express');
const { createLogEntry, viewLogData } = require('../controllers/logController');

const router = express.Router();

router.post('/log-data', createLogEntry);
router.get('/view-data', viewLogData);

module.exports = router;