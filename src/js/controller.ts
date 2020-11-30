import { getParents } from './helpers';
import { Item, controllerInterface, storeInterface, viewInterface } from './types';

const getMaxOfArray = ( items: Item[] ) => {
  const maxNumber = items.
    map( ( item ) => {
      return item.id;
    } ).
    reduce( ( acc, cur ) => {
      return Math.max( acc, cur );
    }, 0 );

  return maxNumber;
};

export default class Controller implements controllerInterface {
  index = getMaxOfArray( this.store.getData() );

  constructor( readonly store: storeInterface, readonly view: viewInterface ) {
    view.bindRemoveItem( this.removeItem.bind( this ) );
    view.bindAddItem( this.addItem.bind( this ) );
    view.bindUpdateItem( this.updateItem.bind( this ) );
    view.displayItems( this.store.getData() );
  }

  addItem( parent: string | undefined ) {
    const item: Item = {
      id: ++this.index,
      parent: parent !== '-1' ? Number( parent ) : -1,
      question: '',
      type: ''
    };

    if ( parent !== '-1' ) {
      item.conditionType = '';
      item.conditionValue = '';
    }

    this.store.add( item );
    this.view.addItem( item );
  }

  removeItem( parents: string[] ) {
    this.store.remove( parents );
    this.view.removeItem( parents[ 0 ] );
  }

  updateItem( formElement: HTMLInputElement | HTMLSelectElement ) {
    const parents = getParents( formElement, 'update' );
    this.store.update( formElement, parents );
    this.view.updateItem( formElement, parents );
  }
}
