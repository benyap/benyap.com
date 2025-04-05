export class Exception<TCode extends string> extends Error {
  constructor(
    /** A code to identify the error that occurred. */
    readonly code: TCode,
    message?: string,
    cause?: unknown,
  ) {
    super(message, { cause });
  }

  static create<TCode extends string>(code: TCode) {
    return class _CustomException extends Exception<TCode> {
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
      constructor(message: string, cause: unknown);

      // Implementation
      constructor(message?: string, cause?: unknown) {
        super(code, message, cause);

        if (cause) this.cause = cause;

        // Provides compatibility with instanceof
        Object.setPrototypeOf(this, new.target.prototype);

        // Maintains proper stack trace for where the error is thrown (only works in V8)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (Error as any).captureStackTrace?.(this, new.target);
      }
    };
  }
}
