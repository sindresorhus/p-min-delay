# p-min-delay [![Build Status](https://travis-ci.org/sindresorhus/p-min-delay.svg?branch=master)](https://travis-ci.org/sindresorhus/p-min-delay)

> Delay a promise a minimum amount of time

While the [`delay`](https://github.com/sindresorhus/delay) module delays the promise a specified amount of time and then resolves it, this module ensures the promise resolves after the specified amount of time.

Useful when you have a promise that may settle immediately or may take some time, and you want to ensure it doesn't settle too fast. For example, if you want to show a loading indicator only if the promise takes more than 1 second.


## Install

```
$ npm install --save p-min-delay
```


## Usage

```js
const pMinDelay = require('p-min-delay');

pMinDelay(somePromise, 1000)
	.then(value => {
		// executed after minimum 1 second even if `somePromise` fulfills before that
	})
	.catch(error => {
		// executed right away regardless of delay if `somePromise` rejects
	});
```


## API

### pMinDelay(input, minimumDelay)

#### input

Type: `Promise`

Promise to delay.

#### minimumDelay

Type: `number`

Time in milliseconds.


## Related

- [delay](https://github.com/sindresorhus/delay) - Delay a promise a specified amount of time
- [p-immediate](https://github.com/sindresorhus/p-immediate) - Returns a promise resolved in the next event loop - think `setImmediate()`
- [p-timeout](https://github.com/sindresorhus/p-timeout) - Timeout a promise after a specified amount of time
- [More…](https://github.com/sindresorhus/promise-fun)


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
