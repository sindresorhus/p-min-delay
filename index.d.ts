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

@param input - Promise to delay.
@param minimumDelay - Time in milliseconds.
*/
export default function pMinDelay<ValueType>(
	input: PromiseLike<ValueType>,
	minimumDelay: number,
	options?: Options
): Promise<ValueType>;
