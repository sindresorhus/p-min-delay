import {expectType} from 'tsd';
import pMinDelay from './index.js';

expectType<Promise<number>>(pMinDelay(Promise.resolve(1), 1000));
expectType<Promise<string>>(
	pMinDelay(Promise.resolve('1'), 1000, {delayRejection: false}),
);

// Function overload tests
const asyncFunction = async (x: number, y: string) => x + y.length;
const delayedFunction = pMinDelay(asyncFunction, 1000);
expectType<(x: number, y: string) => Promise<number>>(delayedFunction);

const simpleFunction = async () => 'hello';
const delayedSimple = pMinDelay(simpleFunction, 1000);
expectType<() => Promise<string>>(delayedSimple);

// With options
const functionWithOptions = pMinDelay(asyncFunction, 1000, {delayRejection: false});
expectType<(x: number, y: string) => Promise<number>>(functionWithOptions);
