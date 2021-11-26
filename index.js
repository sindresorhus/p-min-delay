import delay from 'yoctodelay';

export default async function pMinDelay(promise, minimumDelay, {delayRejection = true} = {}) {
	const delayPromise = delay(minimumDelay);
	await (delayRejection ? delayPromise : Promise.all([promise, delayPromise]));
	return promise;
}
