var assert = require('assert');
var url = require('url');
var zombie = require('zombie');
var examples = require('../../lib/examples');

var ASSERTIONS = {};

module.exports = function() {
  this.World = require('../support/world').World;

  this.Before(function(callback) {
    this.setup(function(){
      var host = this.url('');
      ASSERTIONS['0.5.0 assertion'] = JSON.stringify(examples.validOldAssertion(host));
      ASSERTIONS['1.0.0 assertion'] = JSON.stringify(examples.validAssertion(host));
      ASSERTIONS['1.0.0 signature'] = JSON.stringify(examples.validSignature(host));
      ASSERTIONS['bad assertion'] = '{ "not": "an assertion at all" }';
      ASSERTIONS['bad signature'] = 'randomstring';
      callback();
    });
  });

  this.When(/^I paste in a (.*)$/i, function(type, callback) {
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

  this.Then(/^I expect the validator to report that it's (valid|invalid)$/i, function(validity, callback) {
    validity = validity.toLowerCase();
    assert.equal(this.browser.text('.status').toLowerCase(), validity,
                 "result status should show '" + validity + "'");
    callback();
  });

  this.Then(/^show me that it's version ([\d\.]+)$/i, function(version, callback) {
    assert(this.browser.text('.version').indexOf(version) !== -1,
           "correct version displayed");
    callback();
  });

  this.Then(/^show \w+ reason(?: "([^"]*)")?$/, function(reason, callback) {
    assert(this.browser.query('.reason'), "reason element exists");
    if (reason) 
      assert(this.browser.text('.reason').match(new RegExp(reason, 'i')), 
             "matches provided reason");
    callback();
  });
};