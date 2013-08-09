var zombie = require('zombie');
exports.World = function World(callback) {
  this.browser = new zombie();
  callback();
};
