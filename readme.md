# GTJG

[![Build Status](https://travis-ci.org/hschaeidt/gtjg.svg?branch=master)](https://travis-ci.org/hschaeidt/gtjg)
[![Coverage Status](https://coveralls.io/repos/github/hschaeidt/gtjg/badge.svg?branch=master)](https://coveralls.io/github/hschaeidt/gtjg?branch=master)


## Contents

* [Getting started](#getting-started)
* [Testing Frameworks](#testing-frameworks)
* [Coverage](#coverage)


## Getting started

### Installation

`yarn` is the recommended package manager to manage this projects dependencies.

Run once:

```bash
yarn install
```

### Other Scripts

#### `yarn start`

Runs the app in development mode.<br />
Open [http://localhost:8080](http://localhost:8080) to view in the browser.

#### `yarn build`

Creates a production build - a `app.js` file will be created in the `public/` folder. Production builds come without
 source maps and are minified.<br />
For more information see `config/webpack.prod.config.js`.

#### `yarn lint`

Static code analysis for typescript files. See `/tslint.json` for rule definitions

#### `yarn test`

Runs all tests using [jest-cli](https://facebook.github.io/jest/). All tests located in `__tests__` folders will be
 executed. Also see `package.json` for configuration changes.<br />
A watcher during developement can be started by running `yarn test -- --watch`.

#### `yarn coverage`

Starts the test suite and collects coverage information. The processed coverage report is in `/coverage/remapped`.

#### `yarn ci-coverage`

`travis-ci` specific command.<br />
Test execution and coverage reports that will be uploaded to coveralls.io.

#### `yarn serve`

Launches a minimal express webserver on [localhost:3000](http://localhost:3000).<br />
Used to test service workers.


## Testing Frameworks

The testing frameworks used in this project are [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver),
 [jest](https://facebook.github.io/jest/), and [enzyme](https://github.com/airbnb/enzyme).

The decision between `[ava](https://github.com/avajs/ava)` and `jest` was simply in favor of jests typescript support
 with [ts-jest](https://github.com/kulshekhar/ts-jest). With `ava` everything worked out fine except the code-coverage
 report. It was a little work for the setup, as there are json fixtures imports, the tests had to run through a webpack
 preprocessor. See [commit#f3876f7](https://github.com/hschaeidt/gtjg/commit/f3876f7eea24e7aa9aff89733901236b0b26ceed).

The following tests are executed in the same test-suite.

### End-to-end tests

End-to-end tests are suffixed with `.spec.ts`. In order to start the tests the selenium-server and webpack-dev-server
 has to be started.

This can be done with `yarn start`, `yarn selenium-start`, and finally `yarn test`.

### Unit tests

Unit tests are suffixed with `.test.ts` or `.test.tsx`.

They can be started with `yarn test`.

## Coverage

### Limitations

The tests are written in typescript. Jest has a `transform` hook where a script or a preprocessor can be set.
 [ts-jest](https://github.com/kulshekhar/ts-jest) is "A preprocessor with sourcemap support to help use Typescript with
 Jest". It brings source-map support aswell as a coverage remapping for transpiled codes. However there is an open issue
 that points out the problem of the printed text coverage report in the terminal after test execution. See
 [ts-jest#101](https://github.com/kulshekhar/ts-jest/issues/101) for more information about that. For now we should just
 rely on the results in `/coverage/remapped`.

See in the [package.json](https://github.com/hschaeidt/gtjg/blob/master/package.json) the `jest` section to lookup
 the current configuration.
