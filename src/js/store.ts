import { ItemKeys, Item, storeInterface } from './types';

export default class Store implements storeInterface {
  constructor( readonly name: string ) {}

  getData(): Item[] {
    return JSON.parse( localStorage.getItem( this.name ) || '[]' );
  }

  setData( items: Item[] ) {
    localStorage.setItem( this.name, JSON.stringify( items ) );
  }

  add( item: Item ) {
    const items: Item[] = this.getData();
    items.push( item );
    this.setData( items );
  }

  remove( parents: string[] ) {
    const items: Item[] = this.getData();

    parents.forEach( ( parent ) => {
      const index = items.findIndex( ( item ) => {
        return item.id === Number( parent );
      } );
      items.splice( index, 1 );
    } );

    this.setData( items );
  }

  update( element: HTMLInputElement | HTMLSelectElement, parents: string[] ) {
    const items = this.getData();
    const id = Number( element.id.replace( /\D/g, '' ) );
    const name = element.name as keyof Item;
    const value = element.value;

    const item = items.find( ( item ) => {
      return item.id === id;
    } );

    if ( item && name !== ItemKeys.Id && name !== ItemKeys.Parent ) {
      item[ name ] = value;
    }

    if ( element.matches( '[name="type"]' ) ) {
      parents.forEach( ( parent ) => {
        const item = items.find( ( item ) => {
          return item.id === Number( parent );
        } );

        if ( item ) {
          item.conditionType = '';
          item.conditionValue = '';
        }
      } );
    }

    this.setData( items );
  }
}
