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

test('accepts a function and returns a delayed function', async t => {
	const fixture = Symbol('fixture');
	const fn = async () => fixture;
	const delayedFn = pMinDelay(fn, 100);

	t.is(typeof delayedFn, 'function');

	const end = timeSpan();
	const result = await delayedFn();
	t.is(result, fixture);
	t.true(inRange(end(), {start: 70, end: 130}));
});

test('delayed function handles arguments', async t => {
	const fn = async (a, b) => a + b;
	const delayedFn = pMinDelay(fn, 100);

	const end = timeSpan();
	const result = await delayedFn(2, 3);
	t.is(result, 5);
	t.true(inRange(end(), {start: 70, end: 130}));
});

test('delayed function preserves context', async t => {
	const object = {
		value: 42,
		async getValue() {
			return this.value;
		},
	};

	object.delayedGetValue = pMinDelay(object.getValue, 100);

	const end = timeSpan();
	const result = await object.delayedGetValue();
	t.is(result, 42);
	t.true(inRange(end(), {start: 70, end: 130}));
});

test('delayed function handles rejection', async t => {
	const error = new Error('Function error');
	const fn = async () => {
		throw error;
	};

	const delayedFn = pMinDelay(fn, 100);

	const end = timeSpan();
	await t.throwsAsync(delayedFn(), {is: error});
	t.true(inRange(end(), {start: 70, end: 130}));
});

test('delayed function with delayRejection:false', async t => {
	const error = new Error('Fast rejection');
	const fn = async () => {
		throw error;
	};

	const delayedFn = pMinDelay(fn, 100, {delayRejection: false});

	const end = timeSpan();
	await t.throwsAsync(delayedFn(), {is: error});
	t.true(inRange(end(), {start: 0, end: 30}));
});

test('delayed function handles synchronous throw', async t => {
	const error = new Error('Sync error');
	const syncThrowFunction = () => {
		throw error;
	};

	const delayedFunction = pMinDelay(syncThrowFunction, 100);

	const end = timeSpan();
	await t.throwsAsync(delayedFunction(), {is: error});
	t.true(inRange(end(), {start: 70, end: 130}));
});

test('delayed function handles synchronous return', async t => {
	const syncFunction = () => 'sync-value';
	const delayedFunction = pMinDelay(syncFunction, 100);

	const end = timeSpan();
	const result = await delayedFunction();
	t.is(result, 'sync-value');
	t.true(inRange(end(), {start: 70, end: 130}));
});
