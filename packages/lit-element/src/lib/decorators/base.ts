/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import {ClassElement} from 'updating-element/decorators/base.js';
export * from 'updating-element/decorators/base.js';

export const legacyPrototypeMethod = (
  descriptor: PropertyDescriptor,
  proto: Object,
  name: PropertyKey
) => {
  Object.defineProperty(proto, name, descriptor);
};

export const standardPrototypeMethod = (
  descriptor: PropertyDescriptor,
  element: ClassElement
) => ({
  kind: 'method',
  placement: 'prototype',
  key: element.key,
  descriptor,
});
