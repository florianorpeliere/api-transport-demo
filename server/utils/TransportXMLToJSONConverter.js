const xml2js = require('xml2js');

class TransportXMLToJSONConverter {

    static createLinesFromXML(xml, callback) {

        xml2js.parseString(xml, {trim : true, explicitArray : false}, (err, result) => {
            const resultLines = TransportXMLToJSONConverter.formatLines(result.xmldata.alss);
            callback(resultLines);
        });
    }
    
    static formatLines(sourceLines) {

        const resultLines = [];
        if (sourceLines.$.nb > 0) {
            sourceLines.als.forEach(element => {
                const line = TransportXMLToJSONConverter.formatLine(element.ligne);
                resultLines.push(line);
            });
        }
        return resultLines;
    }

    static formatLine(sourceLine) {

        const line = {};
        line.code = sourceLine.code;
        line.name = sourceLine.nom;
        line.direction = sourceLine.sens;
        line.destination = sourceLine.vers;
        line.color = sourceLine.couleur;
        return line;

    } 

    static createStopsFromXML(xml, callback) {

        xml2js.parseString(xml, {trim : true, explicitArray : false}, (err, result) => {
            const resultLines = TransportXMLToJSONConverter.formatStops(result.xmldata.alss);
            callback(resultLines);
        });
    }

    static formatStops(sourceStops) {

        console.log(sourceStops);

        const resultStops = [];
        if (sourceStops.$.nb > 0) {
            sourceStops.als.forEach(element => {
                const stop = TransportXMLToJSONConverter.formatStop(element.arret);
                stop.line = TransportXMLToJSONConverter.formatLine(element.ligne);
                stop.schedule_codes = element.refs.split('|')
                resultStops.push(stop);
            });
        }
        return resultStops;
    }

    static formatStop(sourceStop) {

        const stop = {};
        stop.code = sourceStop.code;
        stop.name = sourceStop.nom;
        return stop;

    } 
}

module.exports = TransportXMLToJSONConverter;