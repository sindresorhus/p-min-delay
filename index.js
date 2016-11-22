'use strict';
const delay = require('delay');

module.exports = (promise, ms, opts) => {
	opts = Object.assign({
		delayRejection: true
	}, opts);

	let promiseErr;

	if (opts.delayRejection) {
		promise = promise.catch(err => {
			promiseErr = err;
		});
	}

	return Promise.all([promise, delay(ms)])
		.then(val => promiseErr ? Promise.reject(promiseErr) : val[0]);
};
