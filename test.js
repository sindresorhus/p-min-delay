import test from 'ava';
import delay from 'yoctodelay';
import timeSpan from 'time-span';
import inRange from 'in-range';
import pMinDelay from './index.js';

const fixture = Symbol('fixture');

test('only settles after minimum delay', async t => {
	const end = timeSpan();
	const result = await pMinDelay(Promise.resolve(fixture), 200);
	t.is(result, fixture);
	t.true(inRange(end(), {start: 170, end: 230}));
});

test('accept non-promise object', async t => {
	const end = timeSpan();
	const result = await pMinDelay(fixture, 200);
	t.is(result, fixture);
	t.true(inRange(end(), {start: 170, end: 230}));
});

test('promise takes longer than minimum delay', async t => {
	const end = timeSpan();
	await pMinDelay(delay(200), 100);
	t.true(inRange(end(), {start: 170, end: 230}));
});

test('minimum delay applies to rejection too', async t => {
	const end = timeSpan();
	await pMinDelay(Promise.reject(), 100).catch(() => {});
	t.true(inRange(end(), {start: 70, end: 130}));
});

test('option - {delayRejection:false}', async t => {
	const end = timeSpan();
	await pMinDelay(Promise.reject(), 100, {delayRejection: false}).catch(() => {});
	t.true(inRange(end(), {start: 0, end: 30}));
});

test('handles early rejection without unhandled promise rejection - issue #25', async t => {
	const end = timeSpan();
	const error = new Error('Test error');

	// Promise that rejects before minimum delay (50ms < 100ms)
	const promise = new Promise((_, reject) => {
		setTimeout(() => reject(error), 50);
	});

	// Should handle rejection without unhandled promise rejection
	await t.throwsAsync(
		pMinDelay(promise, 100),
		{is: error},
	);

	// Should still wait for minimum delay
	t.true(inRange(end(), {start: 70, end: 130}));
});

test('handles immediate rejection without unhandled promise rejection', async t => {
	const end = timeSpan();
	const error = new Error('Immediate error');

	// Promise that rejects immediately (synchronously)
	const promise = Promise.reject(error);

	await t.throwsAsync(
		pMinDelay(promise, 100),
		{is: error},
	);

	// Should still wait for minimum delay
	t.true(inRange(end(), {start: 70, end: 130}));
});
