# openbadges-validator-service [![Build Status](https://travis-ci.org/mozilla/openbadges-validator-service.png)](https://travis-ci.org/mozilla/openbadges-validator-service)

This is the Web front-end for [openbadges-validator][].

# Quick Start

```bash
$ npm install
$ npm test
$ node bin/openbadges-validator-service.js
```

Then visit http://localhost:8888.

# Environment Variables

* `PORT` is the port to serve the Web application on. Defaults to 8888.

* `NEW_RELIC_HOME` is the optional path to the directory containing
  `newrelic.js`, if you want to integrate with
  [New Relic][].

# Acceptance Tests

Acceptance tests are automatically run with `npm test`. Their behavior
can be changed by the following environment variables:

* `ACCEPTANCE_EXTERNAL_URL` lets you provide an external URL to run
the acceptance tests against. If left empty, an instance is run on
`localhost` and tests run against that. 

# Test Coverage

Build/install [jscoverage][], run `make test-cov`, then open
`coverage.html` in a browser.

# License

MPL 2.0

  [openbadges-validator]: https://github.com/mozilla/openbadges-validator
  [New Relic]: http://newrelic.com/
  [jscoverage]: https://github.com/visionmedia/node-jscoverage
