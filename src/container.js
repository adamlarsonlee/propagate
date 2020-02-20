const Bottle = require('bottlejs');

const bottle = new Bottle();

require('./cell/cell')(bottle);
require('./event-emitter/event-emitter')(bottle);
require('./m/m')(bottle);
require('./square/square')(bottle);

module.exports = bottle.container;
