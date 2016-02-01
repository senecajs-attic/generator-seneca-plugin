'use strict'
var path = require('path')
var _ = require('lodash')
var yeoman = require('yeoman-generator')
var chalk = require('chalk')
var yosay = require('yosay')

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async()

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the fantastic ' + chalk.red('Seneca Plugin') + ' generator!'
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
      if (this.foldername !== _.last(this.destinationRoot().split(path.sep))) {
        this.destinationRoot(path.join(this.destinationRoot(), this.foldername))
      }

      this.config.save()
    }
  },
  writing: {
    app: function () {
      var context = {
        pluginname: this.options.pluginname || this.pluginname,
        pascalname: this.options.pascalname || this.pascalname
      }

      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        context
      )
      this.fs.copyTpl(
        this.templatePath('_README.md'),
        this.destinationPath('readme.md'),
        context
      )
      this.fs.copyTpl(
        this.templatePath('lib/_index.js'),
        this.destinationPath('lib/index.js'),
        context
      )
      this.fs.copyTpl(
        this.templatePath('test/_index.js'),
        this.destinationPath('test/index.js'),
        context
      )
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('eslintrc'),
        this.destinationPath('.eslintrc')
      )
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      )
      this.fs.copy(
        this.templatePath('travis.yml'),
        this.destinationPath('.travis.yml')
      )
      this.fs.copy(
        this.templatePath('LICENSE'),
        this.destinationPath('LICENSE')
      )
    }
  },

  install: function () {
    this.installDependencies({ bower: false })
  }
})
