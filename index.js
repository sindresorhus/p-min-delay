'use strict';
const delay = require('delay');

const pMinDelay = async (promise, ms, options) => {
	options = {
		delayRejection: true,
		...options
	};

	let promiseError;

	if (options.delayRejection) {
		promise = promise.catch(error => {
			promiseError = error;
		});
	}

	const value = await Promise.all([promise, delay(ms)]);
	return promiseError ? Promise.reject(promiseError) : value[0];
};

module.exports = pMinDelay;
module.exports.default = pMinDelay;
