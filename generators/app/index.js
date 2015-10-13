'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the fantastic ' + chalk.red('Seneca Plugin') + ' generator!'
    ));
    done();
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_readme.md'),
        this.destinationPath('readme.md')
      );
      this.fs.copy(
        this.templatePath('lib/_index.js'),
        this.destinationPath('lib/index.js')
      );
      this.fs.copy(
        this.templatePath('test/_index.js'),
        this.destinationPath('test/index.js')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('eslintrc'),
        this.destinationPath('.eslintrc')
      );
      this.fs.copy(
        this.templatePath('travis.yml'),
        this.destinationPath('.travis.yml')
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
