import './css/app.scss';

import Controller from './js/controller';
import Template from './js/template';
import Store from './js/store';
import View from './js/view';

const store = new Store( 'store' );
const template = new Template();
const view = new View( template );

const controller = new Controller( store, view );
