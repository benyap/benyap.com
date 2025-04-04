export class Exception<TCause = unknown> extends Error {
  /**
   * A property indicating the specific cause of the error.
   *
   * @override
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause
   */
  override readonly cause?: TCause;

  /**
   * Create an {@link EError} instance with an empty message.
   */
  constructor();

  /**
   * Create an {@link EError} instance with the given message.
   */
  constructor(message: string);

  /**
   * Create an {@link EError} instance with the given message and cause.
   * The message of the causing error will be appended to this error's message.
   *
   * @param message The error message.
   * @param cause The causing error to wrap.
   */
  constructor(message: string, cause: TCause);

  // Implementation
  constructor(message?: string, cause?: TCause) {
    super(message);

    if (cause) this.cause = cause;

    // Provides compatibility with instanceof
    Object.setPrototypeOf(this, new.target.prototype);

    // Set the correct constructor name when subclassed
    this.name = new.target.name;

    // Maintains proper stack trace for where the error is thrown (only works in V8)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Error as any).captureStackTrace?.(this, new.target);
  }
}
