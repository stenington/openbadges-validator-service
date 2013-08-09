var assert = require('assert');
var url = require('url');
var zombie = require('zombie');
var examples = require('../../lib/examples');

var ASSERTIONS = {};

module.exports = function() {
  this.World = require('../support/world').World;

  this.Before(function(callback) {
    var world = this;
    var app = require('../../').app.build({
      logLevel: 'fatal'
    });
    app.listen(0, function() {
      var server = this;
      world.url = function(path) {
        return url.resolve('http://localhost:' + server.address().port, path);
      };
      var host = world.url('');
      ASSERTIONS['0.5.0 assertion'] = JSON.stringify(examples.validOldAssertion(host));
      ASSERTIONS['1.0.0 assertion'] = JSON.stringify(examples.validAssertion(host));
      ASSERTIONS['1.0.0 signature'] = JSON.stringify(examples.validSignature(host));
      callback();
    });
  });

  this.When(/^I paste in a properly formatted ([\d\.]+ \w+)$/, function(type, callback) {
    var browser = this.browser;
    browser.visit(this.url('/'), function(err){
      if (err)
        return callback(err);
      browser
        .fill('assertion', ASSERTIONS[type])
        .pressButton('Check Validity', function(){
          browser.wait(function(){
            return browser.window.document.querySelector("#js-result-container"); 
          }, callback);
        });
    });
  });

  this.Then(/^I expect the validator to report that it's valid$/, function(callback) {
    assert.equal(this.browser.text('.status'), 'Valid',
                 "result status should show 'Valid'");
    callback();
  });

  this.Then(/^show me that it's version ([\d\.]+)$/, function(version, callback) {
    assert(this.browser.text('.version').indexOf(version) !== -1,
           "correct version displayed");
    callback();
  });

};