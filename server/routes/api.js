const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.json('Welcome to the API !');
});

router.get('/lines', function(req, res) {
    // FIXME : implement this method
    res.json('bus / tram lines');
});

router.get('/stops', function(req, res) {
    // FIXME : implement this method
    res.json('bus / tram stops');
});

router.get('/schedules', function(req, res) {
    // FIXME : implement this method
    res.json('bus / tram stop schedules');
});

module.exports = router;
