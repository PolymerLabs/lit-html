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
var t;const s=`lit$${(Math.random()+"").slice(9)}$`,i="?"+s,e=`<${i}>`,h=document,n=(t="")=>h.createComment(t),o=t=>null===t||"object"!=typeof t&&"function"!=typeof t,r=Array.isArray,l=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,c=/-->/g,a=/>/g,u=/>|[ 	\n\r](?:([^ -- "'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,d=/'/g,f=/"/g,p=/^(?:script|style|textarea)$/i,v=(t=>(s,...i)=>({_$litType$:t,strings:s,values:i}))(1),w=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),y=new Map,g=h.createTreeWalker(h,133,null,!1),m=(t,i)=>{const h=t.length-1,n=[];let o,r=2===i?"<svg>":"",v=l;for(let i=0;i<h;i++){const h=t[i];let w,b,y=-1,g=0;for(;g<h.length&&(v.lastIndex=g,b=v.exec(h),null!==b);)g=v.lastIndex,v===l?"!--"===b[1]?v=c:void 0!==b[1]?v=a:void 0!==b[2]?(p.test(b[2])&&(o=RegExp("</"+b[2],"g")),v=u):void 0!==b[3]&&(v=u):v===u?">"===b[0]?(v=o??l,y=-1):void 0===b[1]?y=-2:(y=v.lastIndex-b[2].length,w=b[1],v=void 0===b[3]?u:'"'===b[3]?f:d):v===f||v===d?v=u:v===c||v===a?v=l:(v=u,o=void 0);r+=v===l?h+e:y>=0?(n.push(w),h.slice(0,y)+"$lit$"+h.slice(y)+s):h+s+(-2===y?(n.push(void 0),i):"")}return[r+(t[h]||"<?>")+(2===i?"</svg>":""),n]};class S{constructor({strings:t,_$litType$:e},h){let o;this.o=[],this.C=h;let r=0,l=0,c=0;const a=t.length-1,[u,d]=m(t,e);if(this.B=this.A(u),g.currentNode=this.B.content,2===e){const t=this.B.content,s=t.firstChild;s.remove(),t.append(...s.childNodes)}for(;null!==(o=g.nextNode())&&l<a;){if(1===o.nodeType){if(o.hasAttributes()){const t=[];for(const i of o.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(s)){const e=d[c++];if(t.push(i),void 0!==e){const t=o.getAttribute(e.toLowerCase()+"$lit$").split(s),i=/([.?@])?(.*)/.exec(e);this.o.push({h:1,l:r,u:i[2],v:t,p:"."===i[1]?x:"?"===i[1]?O:"@"===i[1]?A:M}),l+=t.length-1}else this.o.push({h:6,l:r})}for(const s of t)o.removeAttribute(s)}if(p.test(o.tagName)){const t=o.textContent.split(s),i=t.length-1;if(i>0){o.textContent="";for(let s=0;s<i;s++)o.append(t[s]||n()),this.o.push({h:2,l:++r}),l++;o.append(t[i]||n())}}}else if(8===o.nodeType)if(o.data===i)l++,this.o.push({h:2,l:r});else{let t=-1;for(;-1!==(t=o.data.indexOf(s,t+1));)this.o.push({h:7,l:r}),l++,t+=s.length-1}r++}}A(t){const s=h.createElement("template");return s.innerHTML=t,s}}function C(t,s,i=t,e){var h;if(s===w)return s;let n=void 0!==e?i.Σ_?.[e]:i.Σm;const r=o(s)?void 0:s._$litDirective$;return n?.constructor!==r&&(n?.S?.(!1),n=void 0===r?void 0:new r({...t,$:t,Q:i,g:e}),void 0!==e?((h=i).Σ_??(h.Σ_=[]))[e]=n:i.Σm=n),void 0!==n&&(s=n.k(s.values)),s}class ${constructor(t,s){this.o=[],this.R=void 0,this.G=t,this.Q=s}j(t){const{B:{content:s},o:i}=this.G,e=h.importNode(s,!0);g.currentNode=e;let n=g.nextNode(),o=0,r=0,l=i[0];for(;void 0!==l&&null!==n;){if(o===l.l){let s;2===l.h?s=new k(n,n.nextSibling,this,t):1===l.h?s=new l.p(n,l.u,l.v,this,t):6===l.h&&(s=new j(n,this,t)),this.o.push(s),l=i[++r]}void 0!==l&&o!==l.l&&(n=g.nextNode(),o++)}return e}W(t){let s=0;for(const i of this.o)void 0!==i&&(void 0!==i.strings?(i.M(t,i,s),s+=i.strings.length-2):i.M(t[s])),s++}}class k{constructor(t,s,i,e){this.type=2,this.R=void 0,this.D=t,this.E=s,this.Q=i,this.options=e}setConnected(t){this.T?.(t)}get parentNode(){return this.D.parentNode}M(t,s=this){t=C(this,t,s),o(t)?t===b?(this.V(),this.L=b):t!==this.L&&t!==w&&this.Y(t):void 0!==t._$litType$?this.q(t):void 0!==t.nodeType?this.X(t):(t=>r(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.tt(t):this.Y(t)}st(t,s=this.E){return this.D.parentNode.insertBefore(t,s)}X(t){this.L!==t&&(this.V(),this.L=this.st(t))}Y(t){const s=this.D.nextSibling;t??(t=""),null!==s&&3===s.nodeType&&(null===this.E?null===s.nextSibling:s===this.E.previousSibling)?s.data=t:this.X(h.createTextNode(t)),this.L=t}q(t){const{values:s,strings:i}=t,e=this.F(i,t);if(this.L?.G===e)this.L.W(s);else{const t=new $(e,this),i=t.j(this.options);t.W(s),this.X(i),this.L=t}}F(t,s){let i=y.get(t);return void 0===i&&y.set(t,i=new S(s)),i}tt(t){r(this.L)||(this.L=[],this.V());const s=this.L;let i,e=0;for(const h of t)e===s.length?s.push(i=new k(this.st(n()),this.st(n()),this,this.options)):i=s[e],i.M(h),e++;e<s.length&&(this.V(i&&i.E.nextSibling,e),s.length=e)}V(t=this.D.nextSibling,s){for(this.T?.(!1,!0,s);t&&t!==this.E;){const s=t.nextSibling;t.remove(),t=s}}}class M{constructor(t,s,i,e,h){this.type=1,this.L=b,this.R=void 0,this.it=void 0,this.element=t,this.name=s,this.Q=e,this.options=h,i.length>2||""!==i[0]||""!==i[1]?(this.L=Array(i.length-1).fill(b),this.strings=i):this.L=b}get tagName(){return this.element.tagName}M(t,s=this,i,e){const h=this.strings;let n=!1;if(void 0===h)t=C(this,t,s,0),n=!o(t)||t!==this.L&&t!==w,n&&(this.L=t);else{const e=t;let r,l;for(t=h[0],r=0;r<h.length-1;r++)l=C(this,e[i+r],s,r),l===w&&(l=this.L[r]),n||(n=!o(l)||l!==this.L[r]),l===b?t=b:t!==b&&(t+=(l??"")+h[r+1]),this.L[r]=l}n&&!e&&this.nt(t)}nt(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class x extends M{constructor(){super(...arguments),this.type=3}nt(t){this.element[this.name]=t===b?void 0:t}}class O extends M{constructor(){super(...arguments),this.type=4}nt(t){t&&t!==b?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class A extends M{constructor(){super(...arguments),this.type=5}M(t,s=this){if((t=C(this,t,s,0)??b)===w)return;const i=this.L,e=t===b&&i!==b||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,h=t!==b&&(i===b||e);e&&this.element.removeEventListener(this.name,this,i),h&&this.element.addEventListener(this.name,this,t),this.L=t}handleEvent(t){"function"==typeof this.L?this.L.call(this.options?.host??this.element,t):this.L.handleEvent(t)}}class j{constructor(t,s,i){this.element=t,this.type=6,this.R=void 0,this.it=void 0,this.Q=s,this.options=i}M(t){C(this,t)}}globalThis.litHtmlPlatformSupport?.(S,k),((t=globalThis).litHtmlVersions??(t.litHtmlVersions=[])).push("2.0.0-pre.5");
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const U=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,E=Symbol();class T{constructor(t,s){if(s!==E)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return U&&void 0===this.t&&(this.t=new CSSStyleSheet,this.t.replaceSync(this.cssText)),this.t}toString(){return this.cssText}}const N=new Map,P=U?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let s="";for(const i of t.cssRules)s+=i.cssText;return(t=>new T(t+"",E))(s)})(t):t
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
 */;window.JSCompiler_renameProperty=(t,s)=>t;const R={toAttribute(t,s){switch(s){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},_=(t,s)=>s!==t&&(s==s||t==t),z={attribute:!0,type:String,converter:R,reflect:!1,hasChanged:_};class q extends HTMLElement{constructor(){super(),this.Πi=new Map,this.Πo=void 0,this.Πh=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.Πl=null,this.Πu=new Promise((t=>this.enableUpdating=t)),this.P=new Map,this.Πp(),this.requestUpdate()}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((s,i)=>{const e=this.Πm(i,s);void 0!==e&&(this.Πv.set(e,i),t.push(e))})),t}static createProperty(t,s=z){if(s.state&&(s.attribute=!1),this.finalize(),this.elementProperties.set(t,s),!s.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,i,s);void 0!==e&&Object.defineProperty(this.prototype,t,e)}}static getPropertyDescriptor(t,s,i){return{get(){return this[s]},set(e){const h=this[t];this[s]=e,this.requestUpdate(t,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||z}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this.Πv=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,s=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of s)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const s=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)s.unshift(P(t))}else void 0!==t&&s.push(P(t));return s}static Πm(t,s){const i=s.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}addController(t){(this.Πg??(this.Πg=[])).push(t)}removeController(t){this.Πg?.splice(this.Πg.indexOf(t)>>>0,1)}Πp(){this.constructor.elementProperties.forEach(((t,s)=>{this.hasOwnProperty(s)&&(this.Πi.set(s,this[s]),delete this[s])}))}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{U?t.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((s=>{const i=document.createElement("style");i.textContent=s.cssText,t.appendChild(i)}))})(t,this.constructor.elementStyles),t}connectedCallback(){this.hasUpdated||(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this.Πg?.forEach((t=>t.connected?.())),this.Πh&&(this.Πh(),this.Πo=this.Πh=void 0)}enableUpdating(t){}disconnectedCallback(){this.Πg?.forEach((t=>t.disconnected?.())),this.Πo=new Promise((t=>this.Πh=t))}attributeChangedCallback(t,s,i){this.O(t,i)}Π_(t,s,i=z){const e=this.constructor.Πm(t,i);if(void 0!==e&&!0===i.reflect){const h=(i.converter?.toAttribute??R.toAttribute)(s,i.type);this.Πl=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this.Πl=null}}O(t,s){const i=this.constructor,e=i.Πv.get(t);if(void 0!==e&&this.Πl!==e){const t=i.getPropertyOptions(e),h=t.converter,n=h?.fromAttribute??("function"==typeof h?h:null)??R.fromAttribute;this.Πl=e,this[e]=n(s,t.type),this.Πl=null}}requestUpdate(t,s,i){let e=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||_)(this[t],s)?(this.P.has(t)||this.P.set(t,s),!0===i.reflect&&this.Πl!==t&&(void 0===this.Πj&&(this.Πj=new Map),this.Πj.set(t,i))):e=!1),!this.isUpdatePending&&e&&(this.Πu=this.Πk())}async Πk(){this.isUpdatePending=!0;try{for(await this.Πu;this.Πo;)await this.Πo}catch(t){Promise.reject(t)}const t=this.performUpdate();return null!=t&&await t,!this.isUpdatePending}performUpdate(){if(!this.isUpdatePending)return;this.hasUpdated,this.Πi&&(this.Πi.forEach(((t,s)=>this[s]=t)),this.Πi=void 0);let t=!1;const s=this.P;try{t=this.shouldUpdate(s),t?(this.Πg?.forEach((t=>t.willUpdate?.())),this.willUpdate(s),this.Πg?.forEach((t=>t.update?.())),this.update(s)):this.Πq()}catch(s){throw t=!1,this.Πq(),s}t&&this.H(s)}willUpdate(t){}H(t){this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.Πg?.forEach((t=>t.updated?.())),this.updated(t)}Πq(){this.P=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.Πu}shouldUpdate(t){return!0}update(t){void 0!==this.Πj&&(this.Πj.forEach(((t,s)=>this.Π_(s,this[s],t))),this.Πj=void 0),this.Πq()}updated(t){}firstUpdated(t){}}q.finalized=!0,q.shadowRootOptions={mode:"open"},globalThis.reactiveElementPlatformSupport?.({ReactiveElement:q}),(window.reactiveElementVersions||(window.reactiveElementVersions=[])).push("1.0.0-pre.1"),(window.litElementVersions||(window.litElementVersions=[])).push("3.0.0-pre.2");class B extends q{constructor(){super(...arguments),this.I={host:this},this.Φo=void 0}createRenderRoot(){var t;const s=super.createRenderRoot();return(t=this.I).renderBefore??(t.renderBefore=s.firstChild),s}update(t){const s=this.render();super.update(t),this.Φo=((t,s,i)=>{const e=i?.renderBefore??s;let h=e.t;if(void 0===h){const t=i?.renderBefore??null;e.t=h=new k(s.insertBefore(n(),t),t,void 0,i)}return h.M(t),h})(s,this.renderRoot,this.I)}connectedCallback(){super.connectedCallback(),this.Φo?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.Φo?.setConnected(!1)}render(){return w}}B.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:B}),globalThis.litElementPlatformSupport?.({LitElement:B});
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
const H=(t,s)=>"method"===s.kind&&s.descriptor&&!("value"in s.descriptor)?{...s,finisher(i){i.createProperty(s.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof s.initializer&&(this[s.key]=s.initializer.call(this))},finisher(i){i.createProperty(s.key,t)}};
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
 */function J(t){return(s,i)=>void 0!==i?((t,s,i)=>{s.constructor.createProperty(i,t)})(t,s,i):H(t,s)
/**
 * @license
 * Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */}var L=function(t,s,i,e){for(var h,n=arguments.length,o=n<3?s:null===e?e=Object.getOwnPropertyDescriptor(s,i):e,r=t.length-1;r>=0;r--)(h=t[r])&&(o=(n<3?h(o):n>3?h(s,i,o):h(s,i))||o);return n>3&&o&&Object.defineProperty(s,i,o),o};let D=class extends B{constructor(){super(...arguments),this.name="World",this.count=0}render(){return v`
      <h1>Hello, ${this.name}!</h1>
      <button @click=${this._onClick} part="button">
        Click Count: ${this.count}
      </button>
      <slot></slot>
    `}_onClick(){this.count++}foo(){return"foo"}};D.styles=((t,...s)=>{const i=s.reduce(((s,i,e)=>s+(t=>{if(t instanceof T)return t.cssText;if("number"==typeof t)return t;throw Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[e+1]),t[0]);let e=N.get(i);return void 0===e&&N.set(i,e=new T(i,E)),e})`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `,L([J()],D.prototype,"name",void 0),L([J({type:Number})],D.prototype,"count",void 0),D=L([(t=>s=>"function"==typeof s?((t,s)=>(window.customElements.define(t,s),s))(t,s):((t,s)=>{const{kind:i,elements:e}=s;return{kind:i,elements:e,finisher(s){window.customElements.define(t,s)}}})(t,s))("my-element")],D);export{D as MyElement};
