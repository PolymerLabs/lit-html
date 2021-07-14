/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * A Context object defines an optional initial value for a Context, as well as a name identifier for debugging purposes.
 */
export type Context<T> = {
  name: string;
  initialValue?: T;
};

/**
 * A helper type which can extract a Context value type from a Context type
 */
export type ContextType<T extends Context<unknown>> = T extends Context<infer Y>
  ? Y
  : never;

/**
 * A function which creates a Context value object
 */
export function createContext<T>(
  name: string,
  initialValue?: T
): Readonly<Context<T>> {
  return {
    name,
    initialValue,
  };
}
