'use strict'
var Path = require('path')
var _ = require('lodash')
var Yeoman = require('yeoman-generator')
var Chalk = require('chalk')
var Yosay = require('yosay')


var templates = [
  ['_package.json', 'package.json'],
  ['_README.md', 'README.md'],
  ['lib/_index.js', 'lib/index.js'],
  ['test/_index.js', 'test/index.js']
]
var files = [
  ['a.eslintrc', '.eslintrc'],
  ['a.gitignore', '.gitignore'],
  ['a.travis.yml', '.travis.yml'],
  ['LICENSE', 'LICENSE']
]

module.exports = Yeoman.Base.extend({
  prompting: function () {
    var done = this.async()

    // Have Yeoman greet the user.
    this.log(Yosay(
      'Welcome to the fantastic ' + Chalk.red('Seneca Plugin') + ' generator!'
    ))

    var prompts = [{
      type: 'input',
      name: 'pluginname',
      message: 'Your plugin name',
      required: true
    }]

    this.prompt(prompts, function (props) {
      this.pluginname = _.kebabCase(props.pluginname)
      this.foldername = _.kebabCase(props.pluginname)
      this.pascalname = _.capitalize(_.camelCase(props.pluginname))
      done()
    }.bind(this))
  },
  configuring: {
    enforceFolderName: function () {
      if (this.foldername !== _.last(this.destinationRoot().split(Path.sep))) {
        this.destinationRoot(Path.join(this.destinationRoot(), this.foldername))
      }

      this.config.save()
    }
  },
  writing: {
    app: function () {
      var gen = this

      var context = {
        pluginname: gen.options.pluginname || gen.pluginname,
        pascalname: gen.options.pascalname || gen.pascalname
      }
      gen.log(context)

      templates.forEach(function(template) {
        gen.fs.copyTpl(
          gen.templatePath(template[0]),
          gen.destinationPath(template[1]),
          context
        )
      })
    },

    projectfiles: function () {
      var gen = this
      files.forEach(function(file) {
        gen.fs.copyTpl(
          gen.templatePath(file[0]),
          gen.destinationPath(file[1])
        )
      })
    }
  },

  install: function () {
    this.installDependencies({bower: false})
  }
})
