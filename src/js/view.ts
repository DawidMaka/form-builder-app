import { Item, Items, templateInterface, viewInterface } from './types';
import { qs, delegate, getParents } from './helpers';

const convertItems = ( items: Items[], id: number ) => {
  return items.reduce( ( result: Items[], originalItem ) => {
    const item = Object.assign( {}, originalItem );

    if ( item.parent !== id ) {
      return result;
    }

    const subItems = convertItems( items, item.id );

    if ( subItems.length ) {
      item.items = subItems;
    }

    return result.concat( [ item ] );
  }, [] );
};

export default class View implements viewInterface {
  readonly formBuilder: Element
  readonly template: templateInterface

  constructor( template: templateInterface, selector: string ) {
    this.formBuilder = qs( selector )!;
    this.template = template;
  }

  displayItems( items: Item[] ) {
    this.template.formList( convertItems( items, -1 ) );
  }

  updateItem(
    formElement: HTMLInputElement | HTMLSelectElement,
    parents: string[]
  ) {
    if ( formElement.matches( '[name="type"]' ) ) {
      const type = formElement.value;

      parents.forEach( ( parent ) => {
        const addSubInput = qs( `[data-parent="${parent}"]` )!;
        const fields = addSubInput.closest( '.fields' )!;
        const fieldsCondition = fields.querySelector( '.fields__condition' )!;
        fields.removeChild( fieldsCondition );
        fields.insertAdjacentElement(
          'afterbegin',
          this.template.conditionFields( { id: Number( parent ) }, type )
        );
      } );
    }
  }

  removeItem( parent: string ) {
    const addSubInput = qs( `[data-parent="${parent}"]` )!;
    const formBuilderWrapper = addSubInput.closest( '.form-builder__wrapper' )!;
    const formBuilderWrapperParent = formBuilderWrapper.parentNode!;
    formBuilderWrapperParent.removeChild( formBuilderWrapper );
  }

  addItem( item: Item ) {
    const addSubInput = document.querySelector(
      `[data-parent="${item.parent}"]`
    )!;

    if ( item.parent !== -1 ) {
      const formBuilderWrapper = addSubInput.closest( '.form-builder__wrapper' )!;
      const type = ( formBuilderWrapper.querySelector(
        `#type-${item.parent}`
      )! as HTMLSelectElement ).value;
      formBuilderWrapper.appendChild( this.template.extendedForm( item, type ) );
    } else {
      this.formBuilder.insertBefore( this.template.basicForm( item ), addSubInput );
    }
  }

  bindAddItem( handler: ( parent: string | undefined ) => void ) {
    delegate( this.formBuilder, '.btn_success', 'click', ( event: Event ) => {
      handler( ( event.target! as HTMLElement ).dataset.parent );
    } );
  }

  bindRemoveItem( handler: ( parents: string[] ) => void ) {
    delegate( this.formBuilder, '.btn_danger', 'click', ( event: Event ) => {
      handler( getParents( event.target! as HTMLElement, 'remove' ) );
    } );
  }

  bindUpdateItem(
    handler: ( element: HTMLInputElement | HTMLSelectElement ) => void
  ) {
    delegate( this.formBuilder, '.fields__control', 'change', ( event: Event ) => {
      handler( event.target! as HTMLInputElement | HTMLSelectElement );
    } );
  }
}
