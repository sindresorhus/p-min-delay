import delay from 'yoctodelay';

export default async function pMinDelay(promise, minimumDelay, {delayRejection = true} = {}) {
	let promiseError;

	if (delayRejection) {
		// TODO: Use try/catch here.
		// eslint-disable-next-line promise/prefer-await-to-then
		promise = promise.catch(error => {
			promiseError = error;
		});
	}

	const [value] = await Promise.all([promise, delay(minimumDelay)]);

	if (promiseError) {
		throw promiseError;
	}

	return value;
}
