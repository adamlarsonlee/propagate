require('../node_modules/tachyons/css/tachyons.min.css');
require('./index.css');

const m = require('mithril');
const events = require('events');

const eventEmitter = new events.EventEmitter();

const cell = require('./cell/cell')(m, eventEmitter);
const square = require('./square/square')(m, cell);

m.route(document.body, '/', {
  '/': {
    view: () => m(square),
  },
});
