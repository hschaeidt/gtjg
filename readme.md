# GTJG

[![Build Status](https://travis-ci.org/hschaeidt/gtjg.svg?branch=master)](https://travis-ci.org/hschaeidt/gtjg)
[![Coverage Status](https://coveralls.io/repos/github/hschaeidt/gtjg/badge.svg?branch=master)](https://coveralls.io/github/hschaeidt/gtjg?branch=master)


## Contents

* [Getting started](#getting-started)
* [Typescript](#typescript)
* [Testing Frameworks](#testing-frameworks)
* [Coverage](#coverage)
* [Readings](#readings)


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
For more information see `config/webpack.prod.config.ts`.

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

## Typescript

Typescript is a typed superset of JavaScript that compiles to plain JavaScript. The advantages are also, that less
 runtime errors may occure, because type errors will be checked by the compiler in a first step. Typescript is also the
 language we use in this project. With high quality type definitions, developed by the community
 ([DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)) or by the vendors of the packages itself,
 autocompletion in the IDE becomes a charm again for JavaScript packages.
 
The [Scoped Package](https://docs.npmjs.com/misc/scope) feature from npm makes it a ease to install third party type
 definitions for a package. For example to install the type definitions for react, it would be enough to run
 `yarn add @types/react` in order to install the type definitions. This is a good alternative to
 [typings](https://github.com/typings/typings) (The Typescript Definition Manager).
 
To find typing definitions for a package, the easiest way would be on 
 [TypeSearch](https://microsoft.github.io/TypeSearch/) or to search directly on [npm](https://www.npmjs.com/) with the
 `scope:types` filter. For example `scope:types react`.
 
### Webpack & NodeJS

Using typescript with webpack and NodeJS requires following dev dependencies:

* `ts-node`
* `@types/webpack-*-plugin`
 
### Limitations

While there are a lot of type definitions packages out there, not everything has or will ever have type definitions. To
 bypass this problem, while still having `noImplicitAny` activated in the `tsconfig.json`, we need to create custom
 typings. In the `custom_typings` folder in the document root there are missing package declarations from 3rd party
 packages coming from npm. Declaring the package name with a export any type will be enough to supress compiler errors.

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

## Readings

##### Webpack & Offline (PWA)

* E-Book: [SurviveJS - Webpack](https://survivejs.com/webpack/)
* Demo Application: [webpack-pwa](https://github.com/webpack/webpack-pwa)
