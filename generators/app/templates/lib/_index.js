'use strict'

// Load modules

// Declare internals
var internals = {
  name: '<%= pluginName %>',
  defaults: {
    // Put any default plugin settings here
  }
}

module.exports = function (options) {
  var seneca = this

  options = seneca.util.deepextend(internals.defaults, options)

  return { name: internals.name }
}
