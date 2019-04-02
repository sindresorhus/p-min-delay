'use strict';
const delay = require('delay');

const pMinDelay = async (promise, minimumDelay, options) => {
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

	const value = await Promise.all([promise, delay(minimumDelay)]);
	return promiseError ? Promise.reject(promiseError) : value[0];
};

module.exports = pMinDelay;
// TODO: Remove this for the next major release
module.exports.default = pMinDelay;
