declare namespace pMinDelay {
	interface Options {
		/**
		Delay the rejection.

		Turn this off if you want a rejected promise to fail fast.

		@default true
		*/
		readonly delayRejection?: boolean;
	}
}

declare const pMinDelay: {
	/**
	Delay a promise a minimum amount of time.

	@param promise - Promise to delay.
	@param minimumDelay - Time in milliseconds.

	@example
	```
	import pMinDelay = require('p-min-delay');

	(async () => {
		const value = await pMinDelay(somePromise, 1000);
		// Executed after minimum 1 second even if `somePromise` fulfills before that
	})();
	```
	*/
	<ValueType>(
		promise: PromiseLike<ValueType>,
		minimumDelay: number,
		options?: pMinDelay.Options
	): Promise<ValueType>;

	// TODO: Remove this for the next major release, refactor the whole definition to:
	// declare function pMinDelay<ValueType>(
	// 	promise: PromiseLike<ValueType>,
	// 	minimumDelay: number,
	// 	options?: pMinDelay.Options
	// ): Promise<ValueType>;
	// export = pMinDelay;
	default: typeof pMinDelay;
};

export = pMinDelay;
