import delay from 'yoctodelay';

export default async function pMinDelay(promise, minimumDelay, {delayRejection = true} = {}) {
	await Promise[delayRejection ? 'allSettled' : 'all']([
		promise,
		delay(minimumDelay)
	]);

	return promise;
}
