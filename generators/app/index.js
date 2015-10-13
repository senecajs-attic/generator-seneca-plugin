'use strict';
var path = require('path');
var _ = require('lodash');
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

    var prompts = [{
      type: 'input',
      name: 'pluginname',
      message: 'Your plugin name',
      required: true
    }];

    this.prompt(prompts, function (props) {
      this.pluginname = _.camelCase(props.pluginname);
      this.foldername = _.kebabCase(props.pluginname);

      done();
    }.bind(this));
  },
  configuring: {
    enforceFolderName: function () {
      if (this.foldername !== _.last(this.destinationRoot().split(path.sep))) {
        this.destinationRoot(this.foldername);
      }

      this.config.save();
    }
  },
  writing: {
    app: function () {
      var context = { pluginname: this.pluginname };

      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        context
      );
      this.fs.copyTpl(
        this.templatePath('_readme.md'),
        this.destinationPath('readme.md'),
        context
      );
      this.fs.copyTpl(
        this.templatePath('lib/_index.js'),
        this.destinationPath('lib/index.js'),
        context
      );
      this.fs.copyTpl(
        this.templatePath('test/_index.js'),
        this.destinationPath('test/index.js'),
        context
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
    this.installDependencies({ bower: false });
  }
});
