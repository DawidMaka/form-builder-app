import { qs, delegate } from './helpers';

const itemParents = ( elem ) => {
	const items = Array.from( elem.closest( '.form-builder__wrapper' ).querySelectorAll( '.btn_success' ) );
	const arr = items.map( item => item.dataset.parent );

	return arr;
};

const itemChildren = ( elem ) => {
	const container = elem.closest( '.form-builder__wrapper' );
	const items = Array.from( container.children );
	items.shift();

	const parents = items.map( item => item.querySelector( '.btn_success' ).dataset.parent );

	return parents;
};

const convertItems = ( items, id ) => {
	return items.reduce( ( result, originalItem ) => {
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

export default class View{
	constructor( template ) {
		this.template = template;
		this.nativeContainer = qs( '.formBuilderApp' );
		this.container = qs( '#container', this.nativeContainer );
	}

	showItems( items ) {
		this.container.innerHTML = '';
		this.container.appendChild( this.template.itemList( convertItems( items, -1 ) ) );
	}

	removeItem( parents ) {
		const parent = parents.shift();
		const elem = qs( `[data-parent="${ parent }"]` );
		const offsetParent = elem.offsetParent;
		const container = offsetParent.parentNode;

		if ( elem ) {
			container.removeChild( offsetParent );
		}
	}

	bindClearPropertiesItems( handler ) {
		delegate( this.container, '[name = "type"]', 'change', ( { target } ) => {
			handler( itemChildren( target ) );
		} );
	}

	bindAddItem( handler ) {
		delegate( this.nativeContainer, '.btn_success', 'click', ( { target } ) => {
			handler( target.dataset.parent );
		} );
	}

	bindRemoveItem( handler ) {
		delegate( this.container, '.btn_danger', 'click', ( { target } ) => {
			handler( itemParents( target ) );
		} );
	}

	bindEditItem( handler ) {
		delegate( this.container, '.fields__control', 'change', ( { target } ) => {
			handler( target );
		} );
	}
}
