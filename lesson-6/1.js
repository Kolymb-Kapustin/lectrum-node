const fs = require('fs');
const path = require('path');
const fullPath = __filename;

fs.readFile(path.dirname(fullPath) + '/data/1.json', 'utf8', (err, data) => {
    if (err) throw err;

    console.log(data);
});
