'use strict';

let fs = require('fs'),
    path = './server/models';

fs.readdirSync(path)
    .filter(file => file !== 'index.js')
    .forEach(file => require(`./${file}`));