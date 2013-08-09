var zombie = require('zombie');
var url = require('url');

exports.World = function World(callback) {
  var self = this;

  self.browser = new zombie();

  self.runApp = function(callback){
    var app = require('../../').app.build({
      logLevel: 'fatal'
    });
    app.listen(0, function(){
      var server = this;
      self.url = function(path) {
        return url.resolve('http://localhost:' + server.address().port, path);
      };
      callback.call(self);
    });
  };

  callback();
};
