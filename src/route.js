require('../node_modules/tachyons/css/tachyons.min.css');
require('./index.css');

const { m, square } = require('./container');

m.route(document.body, '/', {
  '/': {
    view: () => m(square),
  },
});
