/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {Context, ContextType} from './create-context.js';

declare global {
  interface HTMLElementEventMap {
    /**
     * A 'context-request' event can be emitted by any element which desires
     * a context value to be injected by an external provider.
     */
    'context-request': ContextEvent<Context<unknown>>;
  }
}

/**
 * A callback which is provided by a context requester and is called with the value satisfying the request.
 * This callback can be called multiple times by context providers as the requested value is changed.
 *
 * @param value value provided by a context provider
 * @param dispose a function provided by a context provider which can be called to 'disconnect' the provider from
 * this context consumer. Any provider which will call the callback repeatedly must provide this dispose function.
 */
export type ContextCallback<ValueType> = (
  value: ValueType,
  dispose?: () => void
) => void;

/**
 * An event fired by a context requester to signal it desires a specified context.
 *
 * A provider should inspect the `context` property of the event to determine if it has a value that can
 * satisfy the request, calling the `callback` with the requested value if so.
 *
 * If the requested context event contains a truthy `multiple` value, then a provider can call the callback
 * multiple times if the value is changed, if this is the case the provider should pass a `dispose`
 * method to the callback which requesters can invoke to indicate they no longer wish to receive these updates.
 */
export class ContextEvent<T extends Context<unknown>> extends Event {
  public constructor(
    public readonly context: T,
    public readonly callback: ContextCallback<ContextType<T>>,
    public readonly multiple?: boolean
  ) {
    super('context-request', {bubbles: true, composed: true});
  }
}
