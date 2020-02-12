const getMaxOfArray = ( items ) => {
	const arr = items.map( ( item ) => item.id )
					 .reduce( ( acc, cur ) => Math.max( acc, cur ), 0 );

	return arr;
};

export default class Controller{
	constructor( store, view ) {
		this.store = store;
		this.view = view;

		view.bindEditItem( this.store.update.bind( this.store ) );
		view.bindRemoveItem( this.removeItem.bind( this ) );
		view.bindAddItem( this.addItem.bind( this ) );
		view.bindClearPropertiesItems( this.clearPropertiesItems.bind( this ) );
		view.showItems( this.store.getData() );
	}

	addItem( parent ) {
		if ( this.index === undefined ) {
			this.index = getMaxOfArray( this.store.getData() );
		}

		const obj = {};
		obj.id = ++this.index;
		obj.parent = typeof parent !== 'undefined' ? Number( parent ) : -1;
		obj.question = '';
		obj.type = '';

		if ( typeof parent !== 'undefined' ) {
			obj.conditionType = '';
			obj.conditionValue = '';
		}

		const items = this.store.add( obj );

		this.view.showItems( items );
	}

	removeItem( parents ) {
		this.store.remove( parents );
		this.view.removeItem( parents );
	}

	clearPropertiesItems( parents ) {
		if ( parents.length ) {
			const items = this.store.clear( parents );

			this.view.showItems( items );
		}
	}
}
