export interface Options {
	/**
	Delay the rejection.

	Turn this off if you want a rejected promise to fail fast.

	@default true
	*/
	readonly delayRejection?: boolean;
}

/**
Delay a promise a minimum amount of time.

@param promise - Promise to delay.
@param minimumDelay - Time in milliseconds.

@example
```
import pMinDelay from 'p-min-delay';

const value = await pMinDelay(somePromise, 1000);
// Executed after minimum 1 second even if `somePromise` fulfills before that
```
*/
export default function pMinDelay<T>(
	promise: PromiseLike<T>,
	minimumDelay: number,
	options?: Options
): Promise<T>;
