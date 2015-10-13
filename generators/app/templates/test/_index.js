'use strict'

// Load modules
var Code = require('code')
var Lab = require('lab')
var Seneca = require('seneca')
var <%= pluginname %> = require('..')

// Shortcuts
var lab = exports.lab = Lab.script()
var describe = lab.describe
var it = lab.it
var expect = Code.expect

describe('<%= pluginname %>', function () {
  it('can be used by seneca', function (done) {
    var seneca = Seneca()

    var fn = function () {
      seneca.use(<%= pluginname %>)
    }

    expect(fn).to.not.throw()
    done()
  })
})
