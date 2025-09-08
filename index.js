import delay from 'yoctodelay';

// TODO: Remove this when Promise.try() is widely available.
const promiseTry = (function_ => {
	try {
		return Promise.resolve(function_());
	} catch (error) {
		return Promise.reject(error);
	}
});

async function pMinDelayPromise(promise, minimumDelay, {delayRejection = true} = {}) {
	const delayPromise = delay(minimumDelay);

	if (delayRejection) {
		// Handle the promise early to prevent unhandled rejection
		let result;
		let error;
		try {
			result = await promise;
		} catch (error_) {
			error = error_;
		}

		await delayPromise;

		if (error) {
			throw error;
		}

		return result;
	}

	await Promise.all([promise, delayPromise]);

	return promise;
}

export default function pMinDelay(input, minimumDelay, options) {
	if (typeof input === 'function') {
		return function (...arguments_) {
			return pMinDelayPromise(
				promiseTry(() => input.apply(this, arguments_)),
				minimumDelay,
				options,
			);
		};
	}

	return pMinDelayPromise(input, minimumDelay, options);
}
