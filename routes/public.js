const express = require('express');
const router = express.Router();
var path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/new', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/form.html'));
});

module.exports = router