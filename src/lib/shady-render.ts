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

import {removeNodes} from './dom.js';
import {insertNodeIntoTemplate, removeNodesFromTemplate} from './modify-template.js';
import {RenderOptions} from './render-options.js';
import {parts, render as litRender} from './render.js';
import {templateCaches} from './template-factory.js';
import {TemplateInstance} from './template-instance.js';
import {TemplateResult} from './template-result.js';
import {marker, Template} from './template.js';

export {html, svg, TemplateResult} from '../lit-html.js';

// Get a key to lookup in `templateCaches`.
const getTemplateCacheKey = (type: string, scopeName: string) =>
    `${type}--${scopeName}`;

let compatibleShadyCSSVersion = true;

if (typeof window.ShadyCSS === 'undefined') {
  compatibleShadyCSSVersion = false;
} else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
  console.warn(
      `Incompatible ShadyCSS version detected.` +
      `Please update to at least @webcomponents/webcomponentsjs@2.0.2 and` +
      `@webcomponents/shadycss@1.3.1.`);
  compatibleShadyCSSVersion = false;
}

/**
 * Template factory which scopes template DOM using ShadyCSS.
 * @param scopeName {string}
 */
const shadyTemplateFactory = (scopeName: string) =>
    (result: TemplateResult) => {
      const cacheKey = getTemplateCacheKey(result.type, scopeName);
      let templateCache = templateCaches.get(cacheKey);
      if (templateCache === undefined) {
        templateCache = {
          stringsArray: new WeakMap<TemplateStringsArray, Template>(),
          keyString: new Map<string, Template>()
        };
        templateCaches.set(cacheKey, templateCache);
      }

      let template = templateCache.stringsArray.get(result.strings);
      if (template !== undefined) {
        return template;
      }

      const key = result.strings.join(marker);
      template = templateCache.keyString.get(key);
      if (template === undefined) {
        const element = result.getTemplateElement();
        if (compatibleShadyCSSVersion) {
          window.ShadyCSS!.prepareTemplateDom(element, scopeName);
        }
        template = new Template(result, element);
        templateCache.keyString.set(key, template);
      }
      templateCache.stringsArray.set(result.strings, template);
      return template;
    };

const TEMPLATE_TYPES = ['html', 'svg'];

/**
 * Removes all style elements from Templates for the given scopeName.
 */
const removeStylesFromLitTemplates = (scopeName: string) => {
  TEMPLATE_TYPES.forEach((type) => {
    const templates = templateCaches.get(getTemplateCacheKey(type, scopeName));
    if (templates !== undefined) {
      templates.keyString.forEach((template) => {
        const {element: {content}} = template;
        // IE 11 doesn't support the iterable param Set constructor
        const styles = new Set<Element>();
        Array.from(content.querySelectorAll('style')).forEach((s: Element) => {
          styles.add(s);
        });
        removeNodesFromTemplate(template, styles);
      });
    }
  });
};

const shadyRenderSet = new Set<string>();

/**
 * For the given scope name, ensures that ShadyCSS style scoping is performed.
 * This is done just once per scope name so the fragment and template cannot
 * be modified.
 * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
 * to be scoped and appended to the document
 * (2) removes style elements from all lit-html Templates for this scope name.
 *
 * Note, <style> elements can only be placed into templates for the
 * initial rendering of the scope. If <style> elements are included in templates
 * dynamically rendered to the scope (after the first scope render), they will
 * not be scoped and the <style> will be left in the template and rendered
 * output.
 */
const prepareTemplateStyles =
    (renderedDOM: DocumentFragment, template: Template, scopeName: string) => {
      shadyRenderSet.add(scopeName);
      // Move styles out of rendered DOM and store.
      const styles = renderedDOM.querySelectorAll('style');
      // If there are no styles, there's no work to do.
      if (styles.length === 0) {
        return;
      }
      const condensedStyle = document.createElement('style');
      // Collect styles into a single style. This helps us make sure ShadyCSS
      // manipulations will not prevent us from being able to fix up template
      // part indices.
      // NOTE: collecting styles is inefficient for browsers but ShadyCSS
      // currently does this anyway. When it does not, this should be changed.
      for (let i = 0; i < styles.length; i++) {
        const style = styles[i];
        style.parentNode!.removeChild(style);
        condensedStyle.textContent! += style.textContent;
      }
      // Remove styles from nested templates in this scope.
      removeStylesFromLitTemplates(scopeName);
      // And then put the condensed style into the "root" template passed in as
      // `template`.
      insertNodeIntoTemplate(
          template, condensedStyle, template.element.content.firstChild);
      // Note, it's important that ShadyCSS gets the template that `lit-html`
      // will actually render so that it can update the style inside when
      // needed (e.g. @apply native Shadow DOM case).
      window.ShadyCSS!.prepareTemplateStyles(template.element, scopeName);
      if (window.ShadyCSS!.nativeShadow) {
        // When in native Shadow DOM, re-add styling to rendered content using
        // the style ShadyCSS produced.
        const style = template.element.content.querySelector('style')!;
        renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
      } else {
        // When not in native Shadow DOM, at this point ShadyCSS will have
        // removed the style from the lit template and parts will be broken as a
        // result. To fix this, we put back the style node ShadyCSS removed
        // and then tell lit to remove that node from the template.
        // NOTE, ShadyCSS creates its own style so we can safely add/remove
        // `condensedStyle` here.
        template.element.content.insertBefore(
            condensedStyle, template.element.content.firstChild);
        const removes = new Set();
        removes.add(condensedStyle);
        removeNodesFromTemplate(template, removes);
      }
    };

export interface ShadyRenderOptions extends Partial<RenderOptions> {
  scopeName: string;
}

const fragment = document.createDocumentFragment();

export const render =
    (result: any,
     container: Element|DocumentFragment,
     options: ShadyRenderOptions) => {
      const scopeName = options.scopeName;
      const hasRendered = parts.has(container);
      const needsScoping = container instanceof ShadowRoot &&
          compatibleShadyCSSVersion && result instanceof TemplateResult;
      // handle first render to a scope specially...
      if (needsScoping && !shadyRenderSet.has(scopeName)) {
        // (1) render into a fragment so that we have a chance to
        // prepareTemplateStyles before sub-elements hit the DOM (where they
        // would normally render);
        litRender(
            result,
            fragment,
            {templateFactory: shadyTemplateFactory(scopeName), ...options} as
                RenderOptions);
        const part = parts.get(fragment)!;
        parts.delete(fragment);
        // (2) When rendering a TemplateResult, scope the template with ShadyCSS
        // one time only for this scope.
        const instance = part.value as TemplateInstance;
        prepareTemplateStyles(fragment, instance.template, scopeName);
        // (3) render the fragment into the container and make sure the
        // container knows its `part` is the one we just rendered. This ensures
        // DOM will be re-used on subsequent renders.
        removeNodes(container, container.firstChild);
        container.appendChild(fragment);
        parts.set(container, part);
      } else {
        litRender(
            result,
            container,
            {templateFactory: shadyTemplateFactory(scopeName), ...options} as
                RenderOptions);
      }
      // After elements have hit the DOM, update styling if this is the
      // initial render to this container.
      if (!hasRendered && needsScoping) {
        window.ShadyCSS!.styleElement((container as ShadowRoot).host);
      }
    };
