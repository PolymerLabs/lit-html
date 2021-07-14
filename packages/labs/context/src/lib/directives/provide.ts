import {
  Directive,
  directive,
  DirectiveParameters,
  DirectiveResult,
  ElementPart,
  PartInfo,
  PartType,
} from 'lit/directive.js';
import {noChange} from 'lit';
import {Context} from '../create-context';
import {ContextContainer} from '../controllers/context-container';
import {ContextEvent} from '../context-event';

export class ProvideDirective extends Directive {
  private _container?: ContextContainer<unknown>;
  private _context?: Context<unknown>;
  private _lastElement?: HTMLElement;

  constructor(partInfo: PartInfo) {
    super(partInfo);
    if (partInfo.type !== PartType.ELEMENT) {
      throw new Error(
        'The `provide` directive is only allowed on element bindings'
      );
    }
  }

  render<V>(_context: Context<V>, _value: V) {
    return noChange;
  }

  onContextRequest = (ev: ContextEvent<Context<unknown>>): void => {
    if (ev.context !== this._context) {
      return;
    }
    ev.stopPropagation();
    this._container?.addCallback(ev.callback, ev.multiple);
  };

  update(part: ElementPart, [context, value]: DirectiveParameters<this>) {
    const result = this.render(context, value);
    const element = part.element as HTMLElement;

    if (this._container === undefined) {
      this._container = new ContextContainer(value);
    }
    if (this._lastElement !== element) {
      if (this._lastElement) {
        this._lastElement.removeEventListener(
          'context-request',
          this.onContextRequest
        );
      }
      this._lastElement = element;
    }
    this._context = context;
    this._container.value = value;
    element?.addEventListener('context-request', this.onContextRequest);
    return result;
  }
}

// construct the provide directive, and cast it to the correct generic form since
const provide = directive(ProvideDirective) as <V>(
  context: Context<V>,
  value: V,
  f?: () => unknown
) => DirectiveResult<typeof ProvideDirective>;

export {provide};
