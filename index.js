import delay from 'yoctodelay';

export default async function pMinDelay(promise, minimumDelay, {delayRejection = true} = {}) {
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
