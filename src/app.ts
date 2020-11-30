import './css/app.scss';

import Controller from './js/controller';
import Template from './js/template';
import Store from './js/store';
import View from './js/view';

const store = new Store( 'store' );
const template = new Template( '[data-parent="-1"]' );
const view = new View( template, '.formBuilder' );
new Controller( store, view );
