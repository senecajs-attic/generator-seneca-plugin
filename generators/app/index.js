'use strict'
const Path = require('path')
const _ = require('lodash')
const Yeoman = require('yeoman-generator')
const Chalk = require('chalk')
const Yosay = require('yosay')


const templates = [
  ['_package.json', 'package.json'],
  ['_README.md', 'README.md'],
  ['lib/_index.js', 'lib/index.js'],
  ['test/_index.js', 'test/index.js']
]
const files = [
  ['a.eslintrc', '.eslintrc'],
  ['a.gitignore', '.gitignore'],
  ['a.travis.yml', '.travis.yml'],
  ['a.codeclimate.yml', '.codeclimate.yml'],
  ['LICENSE', 'LICENSE']
]

module.exports = Yeoman.Base.extend({
  prompting: function () {
    const done = this.async()

    // Have Yeoman greet the user.
    this.log(Yosay(
      `Welcome to the fantastic ${Chalk.red('Seneca Plugin')} generator!`
    ))

    const prompts = [{
      type: 'input',
      name: 'pluginname',
      message: 'Your plugin name',
      required: true
    }]

    this.prompt(prompts, function (props) {
      this.pluginName = _.kebabCase(props.pluginName)
      this.folderName = _.kebabCase(props.pluginName)
      this.pascalName = _.capitalize(_.camelCase(props.pluginName))
      done()
    }.bind(this))
  },
  configuring: {
    enforceFolderName: function () {
      if (this.folderName !== _.last(this.destinationRoot().split(Path.sep))) {
        this.destinationRoot(Path.join(this.destinationRoot(), this.folderName))
      }

      this.config.save()
    }
  },
  writing: {
    app: function () {
       const context = {
        pluginName: this.options.pluginName || this.pluginName,
        pascalName: this.options.pascalName || this.pascalName
      }
      templates.forEach((template) => {
        this.template(template[0], template[1], context)
      })
    },

    projectFiles: function () {
      files.forEach((file) => this.copy(file[0], file[1]))
    }
  },

  install: function () {
    this.installDependencies({bower: false})
  }
})
