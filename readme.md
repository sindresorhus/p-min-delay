# p-min-delay

> Delay a promise a minimum amount of time

While the [`delay`](https://github.com/sindresorhus/delay) module delays the promise a specified amount of time and then resolves it, this module ensures the promise resolves after the specified amount of time.

Useful when you have a promise that may settle immediately or may take some time, and you want to ensure it doesn't settle too fast. For example, if you want to show a loading indicator for at least 1 second (but longer if needed) to prevent a confusing flash in the UI.

## Install

```sh
npm install p-min-delay
```

## Usage

```js
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

## API

### pMinDelay(input, minimumDelay, options?)

#### input

Type: `Promise | Function`

Promise to delay or function to wrap with a delay.

When a function is passed, `pMinDelay` returns a new function that wraps the original. Each call to the returned function will ensure the promise it returns takes at least the specified minimum delay to settle.

#### minimumDelay

Type: `number`

Time in milliseconds.

#### options

Type: `Object`

##### delayRejection

Type: `boolean`\
Default: `true`

Delay the rejection.

Turn this off if you want a rejected promise to fail fast.

## Related

- [delay](https://github.com/sindresorhus/delay) - Delay a promise a specified amount of time
- [p-immediate](https://github.com/sindresorhus/p-immediate) - Returns a promise resolved in the next event loop - think `setImmediate()`
- [p-timeout](https://github.com/sindresorhus/p-timeout) - Timeout a promise after a specified amount of time
- [More…](https://github.com/sindresorhus/promise-fun)
