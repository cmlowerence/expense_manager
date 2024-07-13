const express = require('express');
const { createLogEntry, viewLogData } = require('../controllers/logController');

const router = express.Router();

router.post('/api/log-data', createLogEntry);
router.get('/api/view-data', viewLogData);

module.exports = router;