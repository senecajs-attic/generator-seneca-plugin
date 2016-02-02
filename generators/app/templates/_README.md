![Seneca](http://senecajs.org/files/assets/seneca-logo.png)
> A [Seneca.js][] plugin

# <%= pluginName %>

[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Coverage Status][coverage-badge]][coverage-url]
[![Code Climate][codeclimate-badge]][codeclimate-url]
[![Dependency Status][david-badge]][david-url]
[![Gitter][gitter-badge]][gitter-url]

## install

To install, simply use npm. Remember you will need to install [Seneca.js][] if you haven't already.

```sh
> npm install seneca
> npm install <%= pluginName %>
```


## usage

```js
var Seneca = require('seneca')
var <%= pascalName %> = require('<%= pluginName %>')

var seneca = Seneca().use(<%= pascalName %>, {})

seneca.ready(function () {
  // access plugin features
})
```


## test

To run tests, simply use npm:

```sh
> npm run test
```


[Seneca.js]: https://www.npmjs.com/package/seneca
[npm-badge]: https://img.shields.io/npm/v/<%= pluginName %>.svg
[npm-url]: https://npmjs.com/package/<%= pluginName %>
[travis-badge]: https://travis-ci.org/senecajs/<%= pluginName %>.svg
[travis-url]: https://travis-ci.org/senecajs/<%= pluginName %>
[codeclimate-badge]: https://codeclimate.com/github/senecajs/<%= pluginName %>/badges/gpa.svg
[codeclimate-url]: https://codeclimate.com/github/senecajs/<%= pluginName %>
[coverage-badge]: https://coveralls.io/repos/senecajs/<%= pluginName %>/badge.svg?branch=master&service=github
[coverage-url]: https://coveralls.io/github/senecajs/<%= pluginName %>?branch=master
[david-badge]: https://david-dm.org/senecajs/<%= pluginName %>.svg
[david-url]: https://david-dm.org/senecajs/<%= pluginName %>
[gitter-badge]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/senecajs/seneca
