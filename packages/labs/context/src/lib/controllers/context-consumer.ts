/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {ContextEvent} from '../context-event.js';
import {Context, ContextType} from '../create-context.js';
import {ReactiveController, ReactiveElement} from 'lit';

/**
 * ContextConsumer is a ReactiveController which binds a custom-element's
 * lifecycle to the Context API. When an element is connected to the DOM it
 * will emit the context-request event, invoking the callback set on the
 * controller when the context request is satisfied. It will also call
 * the dispose method provided by the Context API when the element is
 * disconnected.
 */
export class ContextConsumer<
  Ctx extends Context<unknown>,
  HostElement extends ReactiveElement
> implements ReactiveController
{
  private provided = false;

  constructor(
    protected host: HostElement,
    private context: Ctx,
    private callback: (value: ContextType<Ctx>, dispose?: () => void) => void,
    private multiple: boolean = false
  ) {
    this.host.addController(this);
  }

  private dispose?: () => void;

  hostConnected(): void {
    this.host.dispatchEvent(
      new ContextEvent(
        this.context,
        (value, dispose) => {
          // some providers will pass a dispose function indicating they may provide future values
          if (this.dispose) {
            // if the dispose function changes this implies we have changed provider
            if (this.dispose !== dispose) {
              // cleanup the old provider
              this.dispose();
            }
            // if we don't support multiple values, immediately dispose
            if (!this.multiple) {
              this.dispose();
            }
          }

          // only invoke callback if we are either expecting multiple or have not yet
          // been provided a value
          if (!this.provided || this.multiple) {
            this.provided = true;
            this.callback(value, dispose);
          }

          this.dispose = dispose;
        },
        this.multiple
      )
    );
  }
  hostDisconnected(): void {
    if (this.dispose) {
      this.dispose();
      this.dispose = undefined;
    }
  }
}
