const m = require('mithril');

function mithril() {
  return m;
}

module.exports = (container) => {
  container.service('m', mithril);
};
