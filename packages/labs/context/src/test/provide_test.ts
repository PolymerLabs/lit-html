/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, TemplateResult, render} from 'lit';
import {property} from 'lit/decorators/property.js';

import {createContext} from '../lit-context';
import {assert} from '@esm-bundle/chai';
import {ContextConsumer} from '../lib/controllers/context-consumer.js';
import {provide} from '../lib/directives/provide';

const simpleContext = createContext<number>('simple-context');

class SimpleContextConsumer extends LitElement {
  @property({type: Number})
  public value = 0;

  public constructor() {
    super();
    new ContextConsumer(
      this,
      simpleContext,
      (value) => {
        this.value = value;
      },
      true // allow multiple values
    );
  }

  protected render(): TemplateResult {
    return html`Value <span id="value">${this.value}</span>`;
  }
}

customElements.define('simple-context-consumer', SimpleContextConsumer);

suite('provide directive', () => {
  test(`can be used as an element part`, async () => {
    const container = document.createElement('div');

    const template = html`<div ${provide(simpleContext, 1000)}>
      <simple-context-consumer></simple-context-consumer>
    </div>`;
    render(template, container);
    document.body.appendChild(container);

    const consumer = container.querySelector(
      'simple-context-consumer'
    ) as SimpleContextConsumer;
    assert.isDefined(consumer);

    assert.strictEqual(consumer.value, 1000);
  });

  test(`can be updated`, async () => {
    const container = document.createElement('div');

    const template = (value: number) => html`<div
      ${provide(simpleContext, value)}
    >
      <simple-context-consumer></simple-context-consumer>
    </div>`;
    render(template(1000), container);
    document.body.appendChild(container);

    const consumer = container.querySelector(
      'simple-context-consumer'
    ) as SimpleContextConsumer;
    assert.isDefined(consumer);

    assert.strictEqual(consumer.value, 1000);

    render(template(500), container);
    assert.strictEqual(consumer.value, 500);
  });
});
