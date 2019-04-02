import {expectType} from 'tsd';
import pMinDelay = require('.');

expectType<Promise<number>>(pMinDelay(Promise.resolve(1), 1000));
expectType<Promise<string>>(
	pMinDelay(Promise.resolve('1'), 1000, {delayRejection: false})
);
