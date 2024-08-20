// https://github.com/sindresorhus/type-fest

/**
 * Matches a JSON object.
 *
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from.
 */
export type JSONObject = { [Key in string]: JSONValue } & {
  [Key in string]?: JSONValue | undefined;
};

/**
 * Matches a JSON array.
 */
export type JSONArray = JSONValue[] | readonly JSONValue[];

/**
 * Matches any valid JSON primitive value.
 */
export type JSONPrimitive = string | number | boolean | null;

/**
 * Matches any valid JSON value.
 */
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
