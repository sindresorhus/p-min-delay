'use strict';
const delay = require('delay');

module.exports = (promise, ms) => Promise.all([promise, delay(ms)]).then(x => x[0]);
