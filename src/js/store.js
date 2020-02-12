export default class Store{
	constructor( name ) {
		this.name = name;
	}

	getData() {
		return JSON.parse( localStorage.getItem( this.name ) || '[]' );
	}

	setData( items ) {
		localStorage.setItem( this.name, JSON.stringify( items ) );
	}

	add( item ) {
		const items = this.getData();
		items.push( item );

		this.setData( items );

		return items;
	}

	remove( parents ) {
		const items = this.getData();

		parents.forEach( ( parent ) => {
			const index = items.findIndex( item => item.id === Number( parent ) );

			items.splice( index, 1 );
		} );

		this.setData( items );
	}

	update( elem ) {
		const items = this.getData();
		const id = Number( elem.id.replace( /\D/g, '' ) );
		const name = elem.name;
		const value = elem.value;

		items.find( ( item ) => item.id === id )[ name ] = value;

		this.setData( items );
	}

	clear( parents ) {
		const items = this.getData();

		let index = 0;

		items.forEach( ( item ) => {
			if ( item.id === Number( parents[ index ] ) ) {
				item.conditionType = '';
				item.conditionValue = '';

				index++;
			}
		} );

		this.setData( items );

		return items;
	}
}

