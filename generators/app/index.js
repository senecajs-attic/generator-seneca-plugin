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
      const gen = this

      const context = {
        pluginname: gen.options.pluginname || gen.pluginname,
        pascalname: gen.options.pascalname || gen.pascalname
      }
      templates.forEach((template) => {
        gen.template(template[0], template[1], context)
      })
    },

    projectfiles: function () {
      const gen = this
      files.forEach((file) => gen.copy(file[0], file[1]))
    }
  },

  install: function () {
    this.installDependencies({bower: false})
  }
})
