export const qs = ( selector, scope ) => {
	return ( scope || document ).querySelector( selector );
};

export const on = ( target, type, callback, capture ) => {
	target.addEventListener( type, callback, !!capture );
};

export const delegate = ( target, selector, type, handler, capture ) => {
	const dispatchEvent = ( event ) => {
		const targetElement = event.target;

		if ( targetElement.matches( selector ) ) {
			handler( event );
		}
	};

	on( target, type, dispatchEvent, !!capture );
};
