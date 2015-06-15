'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var SITE_NAME_KEY = 'siteName'

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'features',
      message: 'Please choose required components',
      choices: [{
        name: 'WebApp',
        value: 'includeWebApp',
        checked: false
      }, {
        name: 'Api',
        value: 'includeApi',
        checked: false
      }]
    }];

    var siteName = this.config.get(SITE_NAME_KEY);
    if (siteName) {
      this.log('Project name is ' + chalk.green(siteName) + '.');
    } else {
      prompts.push({
        name: SITE_NAME_KEY,
        message: 'What would you like to name your project?',
        default: this.appName
      });
    }


    this.prompt(prompts, function (props) {
      var features = props.features;

      function hasFeature(feat) {
        return features.indexOf(feat) !== -1;
      }

      this.config.set(SITE_NAME_KEY, props.sitename);
      this.config.set('includeWebApp', hasFeature('includeWebApp'));
      this.config.set('includeApi', hasFeature('includeApi'));
      this.config.save();

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
