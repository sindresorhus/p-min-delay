export type Options = {
	/**
	Delay the rejection.

	Turn this off if you want a rejected promise to fail fast.

	@default true
	*/
	readonly delayRejection?: boolean;
};

/**
Delay a promise a minimum amount of time.

@param input - Promise or function to delay. When a function is passed, `pMinDelay` returns a new function that wraps the original. Each call to the returned function will ensure the promise it returns takes at least the specified minimum delay to settle.
@param minimumDelay - Time in milliseconds.

@example
```
import pMinDelay from 'p-min-delay';

// With a promise
const value = await pMinDelay(somePromise, 1000);
// Executed after minimum 1 second even if `somePromise` fulfills before that

// With a function
const delayedFunction = pMinDelay(async () => {
	const result = await fetch('/api/data');
	return result.json();
}, 1000);

// The returned function will ensure a minimum delay
const data = await delayedFunction();
// Executed after minimum 1 second even if the fetch completes before that
```
*/
export default function pMinDelay<T>(
	input: PromiseLike<T>,
	minimumDelay: number,
	options?: Options
): Promise<T>;
export default function pMinDelay<T extends (...arguments_: readonly any[]) => unknown>(
	input: T,
	minimumDelay: number,
	options?: Options
): (...arguments_: Parameters<T>) => Promise<Awaited<ReturnType<T>>>;
