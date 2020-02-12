export default class Template{
	itemList( items, type, container ) {
		if ( container === undefined ) {
			container = document.createElement( 'div' );
			container.classList.add( 'form-builder' );
		}

		items.forEach( ( item ) => {
			const formBuilderWrapper = document.createElement( 'div' );
			formBuilderWrapper.classList.add( 'form-builder__wrapper' );
			formBuilderWrapper.innerHTML = `
		    <div class="fields">
		        ${ item.parent !== -1 ? `
		            <div class="fields__group">
		                <label class="fields__label" for="condition-${ item.id }">condition</label>
		                <select class="fields__control" id="condition-${ item.id }" name="conditionType">
		                    <option value="" ${ item.conditionType !== '' ? '' : 'selected="true"' } disabled="true">Select your value</option>
		                    <option ${ item.conditionType === 'Equals' ? 'selected="true"' : '' }>Equals</option>
		                ${ type === 'number' ? `
		                    <option ${ item.conditionType === 'Greather than' ? 'selected="true"' : '' }>Greather than</option>
		                    <option ${ item.conditionType === 'Less than' ? 'selected="true"' : '' }>Less than</option>
		                ` : '' }
		                </select>
		                    <label class="sr-only" for="value-${ item.id }">value</label>
		                ${ type === 'yes/no' ? `
		                <select class="fields__control" id="select-${ item.id }" name="conditionValue">
		                    <option value="" ${ item.conditionValue !== '' ? '' : 'selected="true"' } disabled="true">Select your value</option>
		                    <option ${ item.conditionValue === 'Yes' ? 'selected="true"' : '' }>Yes</option>
		                    <option ${ item.conditionValue === 'No' ? 'selected="true"' : '' }>No</option>
		                </select>
		                ` : `
		                <input class="fields__control" id="value-${ item.id }" name="conditionValue" type=${ type === 'number' ? 'number' : 'text' } ${ item.conditionValue !== '' ? `value=${ item.conditionValue }` : '' } placeholder="Enter your value"> 
		                ` }
		            </div>
		        ` : '' }
		        <div class="fields__group">
		            <label class="fields__label" for="question-${ item.id }">question</label>
		            <input class="fields__control" id="question-${ item.id }" name="question" type="text" value="${ item.question }" placeholder="Enter your question">
		        </div>
		        <div class="fields__group">
		            <label class="fields__label" for="type-${ item.id }">type</label>
		            <select class="fields__control" id="type-${ item.id }" name="type">
		                <option value="" ${ item.type !== '' ? '' : 'selected="true"' }  disabled="true">Select your value</option>
		                <option value="text" ${ item.type === 'text' ? 'selected="true"' : '' }>Text</option>
		                <option value="yes/no" ${ item.type === 'yes/no' ? 'selected="true"' : '' }>Yes/No</option>
		                <option value="number" ${ item.type === 'number' ? 'selected="true"' : '' }>Number</option>
		            </select>
		        </div>
		        <div class="fields__buttons">
		            <button class="btn btn_success" type="button" data-parent="${ item.id }">Add Sub-Input</button>
		            <button class="btn btn_danger" type="button">Delete</button>
		        </div>
		    </div>`;

			if ( item.items ) {
				this.itemList( item.items, item.type, formBuilderWrapper );
			}

			container.appendChild( formBuilderWrapper );
		} );

		return container;
	}
}
