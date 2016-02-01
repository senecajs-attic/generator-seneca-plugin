'use strict'

var path = require('path')
var assert = require('yeoman-assert')
var helpers = require('yeoman-test')

// Load modules
var Lab = require('lab')

// Shortcuts
var lab = exports.lab = Lab.script()
var describe = lab.describe
var before = lab.before
var it = lab.it

var npm = require('npm')

describe('seneca-plugin:app', {'context-timeout': 60000, 'timeout': 180 * 1000}, function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true, pluginname: 'temp', pascalname: 'Temp' })
      .inTmpDir(function (dir) {})
      .on('end', done)
  })

  it('creates files', function (done) {
    assert.file([
      '.eslintrc',
      '.travis.yml',
      'package.json',
      'README.md',
      'test/index.js',
      'lib/index.js'
    ])
    done()
  })

  it('can install deps', function (done) {
    npm.load({}, function () {
      npm.commands.install(function (err, value) {
        done(err, value)
      })
    })
  })

  it('pass generated tests', function (done) {
    npm.commands.test(function (err, value) {
      done(err, value)
    })
  })
})
