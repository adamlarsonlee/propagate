require('../node_modules/tachyons/css/tachyons.min.css');

const m = require('mithril');
const home = require('./home/home')(m);

m.route(document.body, '/', {
  '/': {
    view: () => m(home),
  },
});
