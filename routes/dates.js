const express = require('express');
const { getDates, addDate } = require('../controllers/dateController');

const router = express.Router();

router.get('/', getDates);
router.post('/', addDate);

module.exports = router;