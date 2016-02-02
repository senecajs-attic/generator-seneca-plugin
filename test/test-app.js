'use strict'

const Path = require('path')
const Assert = require('yeoman-assert')
const Helpers = require('yeoman-test')

const Lab = require('lab')
const lab = exports.lab = Lab.script()
const describe = lab.describe
const before = lab.before
const it = lab.it

const npm = require('npm')

describe('seneca-plugin:app', {'context-timeout': 60000, 'timeout': 180 * 1000}, () => {
  before((done) => {
    Helpers.run(Path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true, pluginname: 'temp', pascalname: 'Temp' })
      .inTmpDir(function (dir) {})
      .on('end', done)
  })

  it('creates files', (done) => {
    Assert.file([
      '.eslintrc',
      '.travis.yml',
      '.codeclimate.yml',
      'package.json',
      'README.md',
      'test/index.js',
      'lib/index.js'
    ])
    done()
  })

  it('can install deps', (done) => {
    npm.load({}, () => {
      npm.commands.install((err, value) => done(err, value))
    })
  })

  it('pass generated tests', (done) => {
    npm.commands.test((err, value) => done(err, value))
  })
})
