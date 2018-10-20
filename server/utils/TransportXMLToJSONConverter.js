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
}

module.exports = TransportXMLToJSONConverter;