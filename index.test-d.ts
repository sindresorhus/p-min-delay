import {expectType} from 'tsd-check';
import pMinDelay from '.';

expectType<Promise<number>>(pMinDelay(Promise.resolve(1), 1000));
expectType<Promise<string>>(
	pMinDelay(Promise.resolve('1'), 1000, {delayRejection: false})
);
