# p-min-delay

> Delay a promise a minimum amount of time

While the [`delay`](https://github.com/sindresorhus/delay) module delays the promise a specified amount of time and then resolves it, this module ensures the promise resolves after the specified amount of time.

Useful when you have a promise that may settle immediately or may take some time, and you want to ensure it doesn't settle too fast. For example, if you want to show a loading indicator for at least 1 second (but longer if needed) to prevent a confusing flash in the UI.


## Install

```
$ npm install p-min-delay
```


## Usage

```js
const pMinDelay = require('p-min-delay');

(async () => {
	const value = await pMinDelay(somePromise, 1000);
	// Executed after minimum 1 second even if `somePromise` fulfills before that
})();
```


## API

### pMinDelay(promise, minimumDelay, [options])

#### promise

Type: `Promise`

Promise to delay.

#### minimumDelay

Type: `number`

Time in milliseconds.

#### options

Type: `Object`

##### delayRejection

Type: `boolean`<br>
Default: `true`

Delay the rejection.

Turn this off if you want a rejected promise to fail fast.


## Related

- [delay](https://github.com/sindresorhus/delay) - Delay a promise a specified amount of time
- [p-immediate](https://github.com/sindresorhus/p-immediate) - Returns a promise resolved in the next event loop - think `setImmediate()`
- [p-timeout](https://github.com/sindresorhus/p-timeout) - Timeout a promise after a specified amount of time
- [More…](https://github.com/sindresorhus/promise-fun)


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
