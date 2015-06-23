'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var SITE_NAME_KEY = 'siteName';
var INCLUDE_API_KEY = 'includeApi';
var INCLUDE_WEB_APP = 'includeWebApp';

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    var prompts = [];

    var siteName = this.config.get(SITE_NAME_KEY);
    if (siteName) {
      this.log('Project name is ' + chalk.green(siteName) + '.');
    } else {
      prompts.push({
        name: SITE_NAME_KEY,
        message: 'What would you like to name your project?',
        default: 'My Project'
      });
    }

    var componentsPrompt = {
      type: 'checkbox',
      name: 'features',
      message: 'Please choose required components',
      choices: []
    };

    if (this.config.get(INCLUDE_API_KEY)) {
      this.log('Api already added.');
    } else {
      componentsPrompt.choices.push({
        name: 'Api',
        value: INCLUDE_API_KEY,
        checked: false
      });
    }

    if (this.config.get(INCLUDE_WEB_APP)) {
      this.log('Web App already added.');
    } else {
      componentsPrompt.choices.push({
        name: 'Web App',
        value: INCLUDE_WEB_APP,
        checked: false
      });
    }

    if (componentsPrompt.choices.length != 0) {
      prompts.push(componentsPrompt);
    }

    if (prompts.length == 0) {
      this.log(chalk.green('All components are already added.'));
      return;
    }

    this.prompt(prompts, function (props) {
      var config = this.config;

      function setConfigIfValuePresent(key, value) {
        if (value) {
          config.set(key, value);
          return true;
        }
        return false;
      }

      function hasFeature(feat) {
        return features.indexOf(feat) !== -1;
      }

      var features = props.features;

      setConfigIfValuePresent(SITE_NAME_KEY, props.siteName);
      if (setConfigIfValuePresent(INCLUDE_WEB_APP, hasFeature(INCLUDE_WEB_APP))) {
        this.composeWith('web-booster:web-app');
      }
      if (setConfigIfValuePresent(INCLUDE_API_KEY, hasFeature(INCLUDE_API_KEY))) {
        this.composeWith('web-booster:api');
      }
      config.save();

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
