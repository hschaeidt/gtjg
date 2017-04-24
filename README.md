# GTJG

[![Build Status](https://travis-ci.org/hschaeidt/gtjg.svg?branch=master)](https://travis-ci.org/hschaeidt/gtjg)
[![Coverage Status](https://coveralls.io/repos/github/hschaeidt/gtjg/badge.svg?branch=master)](https://coveralls.io/github/hschaeidt/gtjg?branch=master)

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

Creates a production build - a `app.js` file will be created in the `public/` folder. Production builds come without source maps and are minified.
For more information see `config/webpack.prod.config.js`.

#### `yarn lint`

Static code analysis for typescript files. See `/tslint.json` for rule definitions

#### `yarn test`

Runs all tests using [jest-cli](https://facebook.github.io/jest/). All tests located in `__tests__` folders will be executed. Also see `package.json` for configuration changes.<br />
A watcher during developement can be started by running `yarn test -- --watch`.

#### `yarn coverage`

Test execution and coverage reports will be generated in the `coverage/` folder.

#### `yarn ci-coverage`

`travis-ci` specific command.
Test execution and coverage reports that will be uploaded to coveralls.io.

#### `yarn serve`

Launches a minimal express webserver on [localhost:3000](http://localhost:3000). Used to test service workers.
