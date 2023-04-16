import delay from 'yoctodelay';

export default async function pMinDelay(promise, minimumDelay, {delayRejection = true} = {}) {
	await (delayRejection ? delay(minimumDelay) : Promise.resolve(promise));
	return promise;
}
