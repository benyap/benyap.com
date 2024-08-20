import { inspect } from "util";

import { JSONValue } from "@packages/utils";

import { RedactedDisplay } from "./display";

export type ValueType = "env" | "secret";

/**
 * An environment variable value that may need to be parsed in different ways.
 */
export class Value<T = unknown> {
  static from<T>(value: T, name: string, type: ValueType): Value<T> {
    return new Value<T>(value, name, type);
  }

  private static clone<T, U>(value: Value<T>, newValue: U): Value<U> {
    return Value.from(newValue, value.name, value.type);
  }

  readonly #value: T;

  private constructor(
    value: T,
    /** The name of the value. */
    readonly name: string,
    /** The type of value. */
    readonly type: ValueType,
  ) {
    this.#value = value;
  }

  /**
   * Get the value.
   */
  get value(): T {
    return this.#value;
  }

  /**
   * Ensure that the value is not `undefined` or `null`.
   */
  exists(): this is Value<NonNullable<T>> {
    return typeof this.#value !== "undefined" && this.#value !== null;
  }

  /**
   * Convert the value to a string. If the value is an object, {@link JSON.stringify} is used.
   */
  toString(): Value<string> {
    return Value.clone(
      this,
      typeof this.#value === "string"
        ? this.#value
        : typeof this.#value === "object"
          ? JSON.stringify(this.#value)
          : String(this.#value),
    );
  }

  /**
   * Convert the value to a string and parses it as a JSON value with {@link JSON.parse}.
   */
  toJSON(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reviver?: ((this: any, key: string, value: any) => any) | undefined,
  ): Value<JSONValue> {
    const string = this.toString();
    return Value.clone(this, JSON.parse(string.value, reviver) as JSONValue);
  }

  /**
   * Convert the value to a string and encode it with the specified encoding using a {@link Buffer}.
   */
  encode(encoding: BufferEncoding): Value<string> {
    const string = this.toString();
    return Value.clone(this, Buffer.from(string.value).toString(encoding));
  }

  /**
   * Convert the value to a string and decode it with the specified encoding using a {@link Buffer}.
   */
  decode(encoding: BufferEncoding): Value<string> {
    const string = this.toString();
    return Value.clone(
      this,
      Buffer.from(string.value, encoding).toString("utf8"),
    );
  }

  [inspect.custom]() {
    // Allow value to be displayed when in development or if it is an environment variable
    let displayValue = RedactedDisplay.create();
    if (process.env.NODE_ENV === "development" || this.type === "env")
      displayValue = this.toString().value;
    return inspect(
      { name: this.name, type: this.type, value: displayValue },
      false,
      null,
      true,
    );
  }
}
