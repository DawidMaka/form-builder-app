import { Actions } from './types';

export const qs = ( selector: string, scope?: Element ) => {
  return ( scope || document ).querySelector( selector );
};

export const on = ( target: Element, type: string, callback: ( event: Event ) => void, capture: boolean ) => {
  target.addEventListener( type, callback, !!capture );
};

export const delegate = ( target: Element, selector: string, type: string, handler: ( event: Event ) => void, capture?: boolean ) => {
  const dispatchEvent = ( event: Event ) => {
    const targetElement = event.target! as HTMLElement;

    if ( ( targetElement ).matches( selector ) ) {
      handler( event );
    }
  };

  on( target, type, dispatchEvent, !!capture );
};

export const getParents = ( element: HTMLElement, action: string ) => {
  const formBuilderWrapper = element.closest( '.form-builder__wrapper' )!;
  const parents: string[] = [];

  if ( action === Actions.Remove ) {
    const elements =  formBuilderWrapper.querySelectorAll( '.btn_success' );
    elements.forEach( ( item ) => {
      parents.push( ( item as HTMLElement ).dataset.parent! );
    } );
  } else if ( action === Actions.Update ) {
    const elements = Array.from( formBuilderWrapper.children );
    elements.shift();
    elements.forEach( ( item ) => {
      const element = item.querySelector( '.btn_success' )! as HTMLElement;
      parents.push( element.dataset.parent! );
    } );
  }

  return parents;
};
