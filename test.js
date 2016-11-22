import {serial as test} from 'ava';
import delay from 'delay';
import timeSpan from 'time-span';
import inRange from 'in-range';
import m from './';

const fixture = Symbol('fixture');

test('only settles after minumum delay', async t => {
	const end = timeSpan();
	const res = await m(Promise.resolve(fixture), 200);
	t.is(res, fixture);
	t.true(inRange(end(), 170, 230));
});

test('promise takes longer than minimum delay', async t => {
	const end = timeSpan();
	await m(delay(200), 100);
	t.true(inRange(end(), 170, 230));
});

test('minimum delay applies to rejection too', async t => {
	const end = timeSpan();
	await m(Promise.reject(), 100).catch(() => {});
	t.true(inRange(end(), 70, 130));
});

test('option - {delayRejection:false}', async t => {
	const end = timeSpan();
	await m(Promise.reject(), 100, {delayRejection: false}).catch(() => {});
	t.true(inRange(end(), 0, 30));
});
