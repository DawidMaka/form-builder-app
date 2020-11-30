import { OptionValues, Items, templateInterface } from './types';

export default class Template implements templateInterface {
  element: Element;

  constructor( selector: string ) {
    this.element = document.querySelector( selector )!;
  }

  basicForm( item: Items ) {
    const formBuilderWrapper = document.createElement( 'div' );
    formBuilderWrapper.classList.add( 'form-builder__wrapper' );
    formBuilderWrapper.innerHTML =
    `
      <div class="fields">      
        <div class="fields__group">
          <label class="fields__label" for="question-${ item.id }">question</label>
          <input class="fields__control" id="question-${ item.id }" name="question" type="text" value="${ item.question }" placeholder="Enter your question" autocomplete="off">
        </div>
        <div class="fields__group">
          <label class="fields__label" for="type-${ item.id }">type</label>
          <select class="fields__control" id="type-${ item.id }" name="type">
            <option ${ item.type ? '' : 'selected="true"' }  disabled="true">Select your value</option>
            <option ${ item.type === OptionValues.Text ? 'selected="true"' : '' }>Text</option>
            <option ${ item.type === OptionValues.YesNo ? 'selected="true"' : '' }>Yes/No</option>
            <option ${ item.type === OptionValues.Number ? 'selected="true"' : '' }>Number</option>
          </select>
        </div>
        <div class="fields__buttons">
          <button class="btn btn_success" type="button" data-parent="${ item.id }">Add Sub-Input</button>
          <button class="btn btn_danger" type="button">Delete</button>
        </div>
      </div>
    `;

    return formBuilderWrapper;
  }

  extendedForm( item: Items, type: string = '' ) {
    const formBuilderWrapper = this.basicForm( item );

    if ( item.parent !== -1 ) {
      const fields = formBuilderWrapper.firstElementChild!;
      const fieldsGroup = this.conditionFields( item, type );
      fields.insertAdjacentElement( 'afterbegin', fieldsGroup );
    }

    return formBuilderWrapper;
  }

  conditionFields( item: Partial<Items>, type: string ) {
    const fieldsGroup = document.createElement( 'div' );
    fieldsGroup.classList.add( 'fields__condition', 'fields__group' );
    fieldsGroup.innerHTML =
    `
      <label class="fields__label" for="condition-${ item.id }">condition</label>
      <select class="fields__control" id="condition-${ item.id }" name="conditionType">
        <option ${ item.conditionType ? '' : 'selected="true"' } disabled="true">Select your value</option>
        <option ${ item.conditionType === OptionValues.Equals ? 'selected="true"' : '' }>Equals</option>
      ${ type === 'Number' ? `
        <option ${ item.conditionType === OptionValues.GreatherThan ? 'selected="true"' : '' }>Greather than</option>
        <option ${ item.conditionType === OptionValues.LessThan ? 'selected="true"' : '' }>Less than</option>
      ` : '' }
      </select>
        <label class="sr-only" for="value-${ item.id }">value</label>
      ${ type === 'Yes/No' ? `
      <select class="fields__control" id="select-${ item.id }" name="conditionValue">
        <option ${ item.conditionValue ? '' : 'selected="true"' } disabled="true">Select your value</option>
        <option ${ item.conditionValue === OptionValues.Yes ? 'selected="true"' : '' }>Yes</option>
        <option ${ item.conditionValue === OptionValues.No ? 'selected="true"' : '' }>No</option>
      </select>
      ` : `
      <input class="fields__control" id="value-${ item.id }" name="conditionValue" type=${ type === OptionValues.Number ? 'number' : 'text' } ${ item.conditionValue ? `value=${ item.conditionValue }` : '' } placeholder="Enter your value" autocomplete="off"> 
      ` }
    `;

    return fieldsGroup;
  }

  formList( items: Items[], type?: string, container?: HTMLDivElement ) {
    items.forEach( ( item ) => {
      const formBuilderWrapper = this.extendedForm( item, type );

      if ( item.items ) {
        this.formList( item.items, item.type, formBuilderWrapper );
      }

      if ( container ) {
        container.appendChild( formBuilderWrapper );
      } else {
        this.element.insertAdjacentElement( 'beforebegin', formBuilderWrapper );
      }
    } );
  }
}
