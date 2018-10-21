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
    
    // Retrieval of search criteria
    const params = {};
    if (req.query.code != null) {
        params.ligne = req.query.code;
    }
    
    // Call the web service with criteria
    axios.get(host + '?xml=1', {'params' : params})
        .then(responses => {
            transportXmlConverter.createLinesFromXML(responses.data, (resultLines) => (res.json(resultLines)));
        })
        .catch(err => {
            console.warn(err);
            res.status(500).json({error: 'Internal error'});
        });
});

router.get('/stops', function(req, res) {

    // Checking required parameters
    if (!req.query.line_code || !req.query.line_direction) {
        res.status(422).json({error: 'Missing required parameters lienCode or lineDirection'});
    } else {
     
        const params = {}; 
        params.ligne = req.query.line_code;
        params.sens = req.query.line_direction;

        axios.get(host + '?xml=1', {'params' : params})
            .then(responses => {
                transportXmlConverter.createStopsFromXML(responses.data, (resultLines) => (res.json(resultLines)));
            })
            .catch(err => {
                console.warn(err);
                res.status(500).json({error: 'Internal error'});
            });

    }
});

router.get('/stops/:reference/schedules', function(req, res) {
    // FIXME : implement this method
    res.json('bus / tram stop schedules ' + req.params.reference);
});

module.exports = router;
