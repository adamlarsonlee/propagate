const events = require('events');

function eventEmitter() {
  return new events.EventEmitter();
}

module.exports = (container) => {
  container.service('eventEmitter', eventEmitter);
};
