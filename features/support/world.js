var zombie = require('zombie');
var url = require('url');

const VALIDATOR_EXTERNAL_URL = process.env['ACCEPTANCE_EXTERNAL_URL'];
const DEBUG = process.env['ACCEPTANCE_DEBUG'];

exports.World = function World(callback) {
  var self = this;

  self.browser = new zombie({
    debug: DEBUG,
    silent: !DEBUG
  });

  self.url = function(path) {
    return url.resolve(this.baseUrl, path);
  };

  self.setup = function(callback){
    if (VALIDATOR_EXTERNAL_URL) {
      self.baseUrl = VALIDATOR_EXTERNAL_URL;
      callback.call(self);
    }
    else {
      var app = require('../../').app.build({
        logLevel: 'fatal'
      });
      app.listen(0, function(){
        var server = this;
        self.baseUrl = 'http://localhost:' + server.address().port;
        callback.call(self);
      });
    }
  };

  callback();
};
