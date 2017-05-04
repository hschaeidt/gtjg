# GTJG

[![Build Status](https://travis-ci.org/hschaeidt/gtjg.svg?branch=master)](https://travis-ci.org/hschaeidt/gtjg)
[![Coverage Status](https://coveralls.io/repos/github/hschaeidt/gtjg/badge.svg?branch=master)](https://coveralls.io/github/hschaeidt/gtjg?branch=master)


## Contents

* [Getting started](#getting-started)
* [Typescript](#typescript)
* [Testing Frameworks](#testing-frameworks)
* [Jest](#jest)
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
This command executes all unit-tests ending `.test.tsx?`. 
A watcher during developement can be started by running `yarn test -- --watch`.

#### `yarn test:e2e`

Starts a special helper script `scripts/E2ETestSuiteRunner.ts` which actually does the same as.

```
$ selenium-standalone install
$ selenium-standalone start
$ yarn start
$ jest "(/__tests__/.*spec).(ts|tsx|js)" --forceExit
```

Args will just be piped to jest. The first argument is the test pattern then followed by options. The test pattern
 executes the end-to-end test suite with file endings in `.spec.tsx?`.

#### `yarn test:coverage`

Starts the test suite and collects coverage information. The processed coverage report is in `/coverage/remapped`.

#### `yarn test:coverage-ci`

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

This can be done with `yarn start`, `yarn selenium-start`, and finally `yarn test <testRegex> [options]`.<br />
It can also be run by a little helper script `yarn test:e2e` which does the above manual steps for you.

### Unit tests

Unit tests are suffixed with `.test.ts` or `.test.tsx`.

They can be started with `yarn test`.

## Jest

The test framework of choice for this project is jest.
The configuration part of jest is a little bit awkward and might seem as some magic is happening there, but I will go
 into details and explain why it works the way it works. A lot of the insights were only found out by testing and
 analyzing it's behaviour.
 
### Configuration

The basic and common configuration is located in the `package.json` under the `jest` section. Here it is important to
 notice the following parts:
 
* `"testRegex": "/__tests__/"`
* `"collectCoverage": true`

The `jest-cli` api says: "CLI options take precedence over values from the Configuration.". This is not always true in
 my point of vue. For example have a look at the `package.json` in the `scripts` section at this line:
 `"test": "jest \".*(test).(ts|tsx|js)$\"",`. The first parameter without a options flag represents the option
 [jest \<regexForTestFiles\>](https://facebook.github.io/jest/docs/cli.html#jest-regexfortestfiles). According to the
 documentation it should take precedence of the test regex defined in our `package.json`. But this is not true, instead
 the testRegex is still took into account and the parameter we expected to be the test regex will be passed as
 [--testPathPattern=\<regex\>](https://facebook.github.io/jest/docs/cli.html#testpathpattern-regex). So it is not a
 override but rather a additional regex built on top of the `testRegex` specified in the `package.json`.

Imagine following scenario:

```
"jest": {
  "testRegex": ".*(test).(ts|tsx)$"
}
```

and

```
"scripts": {
  "test": "jest \".*(spec).(ts|tsx)$\""
}
```

We would expect our test script to execute only tests ending in `.spec.ts` or `.spec.tsx`. But in real not one single
 test will be executed. Because the second *testRegex* will be checked *additionally* to the first one. So each
 *testRegex* on it's own will match the correct files, but both combined together will find none.
 
That is why in this solution the base *testRegex* checks only for a `__tests__` folder, whereas the one passed to the
 jest-cli defines what kind of test files in this folder shall be executed.<br />
<br />
Now look at the second part of the jest configuration as described above: `"collectCoverage": true`.
Here we would expect we could override this coverage report by just passing the option
 [`--coverage=false`](https://facebook.github.io/jest/docs/cli.html#coverage) to the cli. But in real it is only a
 truable variable which, for some reason, can't be fed with the option *false*. That is why in it's default
 configuration it is not set, but instead on the relevant parts of the `package.json` where we actually want to collect
 a coverage.

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
