import {serial as test} from 'ava';
import delay from 'yoctodelay';
import timeSpan from 'time-span';
import inRange from 'in-range';
import pMinDelay from '.';

const fixture = Symbol('fixture');

test('only settles after minumum delay', async t => {
	const end = timeSpan();
	const result = await pMinDelay(Promise.resolve(fixture), 200);
	t.is(result, fixture);
	t.true(inRange(end(), 170, 230));
});

test('promise takes longer than minimum delay', async t => {
	const end = timeSpan();
	await pMinDelay(delay(200), 100);
	t.true(inRange(end(), 170, 230));
});

test('minimum delay applies to rejection too', async t => {
	const end = timeSpan();
	await pMinDelay(Promise.reject(), 100).catch(() => {});
	t.true(inRange(end(), 70, 130));
});

test('option - {delayRejection:false}', async t => {
	const end = timeSpan();
	await pMinDelay(Promise.reject(), 100, {delayRejection: false}).catch(() => {});
	t.true(inRange(end(), 0, 30));
});
