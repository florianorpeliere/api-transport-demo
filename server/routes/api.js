const express = require('express');
const router = express.Router();
const axios = require('axios');
const transportXmlConverter = require('../utils/TransportXMLToJSONConverter');

const cityCode = '217';
const host = 'http://timeo3.keolis.com/relais/' + cityCode + '.php';

router.get('/', function(req, res) {
    res.json('Welcome to the API !');
});

router.get('/lines', function(req, res) {
    axios.get(host + '?xml=1')
        .then(responses => {
            transportXmlConverter.createLinesFromXML(responses.data, (resultLines) => (res.json(resultLines)));
        })
        .catch(err => {
            console.warn(err);
            res.status(500).json({error: 'Internal error'});
        });
});

router.get('/stops', function(req, res) {
    // FIXME : implement this method
    res.json('bus / tram stops');
});

router.get('/stops/:reference/schedules', function(req, res) {
    // FIXME : implement this method
    res.json('bus / tram stop schedules ' + req.params.reference);
});

module.exports = router;
