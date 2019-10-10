const fs = require('fs');
const path = require('path');
const fullPath = __filename;

class Json2csv {
    constructor(data) {
        this.csv = ''
    }

    convertToCsv(pathToFile) {
        fs.readFile(path.dirname(fullPath) + pathToFile, 'utf8', (err, data) => {
            if (err) throw err;

            const heads = [];

            JSON.parse(data).forEach((item) => {
                for (const key in item) {
                    if (!heads.includes(key)) {
                        heads.push(key);
                    }
                }
            });

            const result = heads.join(';');
        });
    }
}

const json2csv = new Json2csv();

json2csv.convertToCsv('/data/1.json');
