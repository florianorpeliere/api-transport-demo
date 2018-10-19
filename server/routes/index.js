var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Welcome to the home page !');
});

module.exports = router;
