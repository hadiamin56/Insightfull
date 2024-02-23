const express = require('express');
const router = express.Router();
const { submitForm } = require('../controllers/api');

router.post('/submitForm', submitForm);

module.exports = router;
