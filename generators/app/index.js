'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var constants = require('../../shared/constants');


module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    var prompts = [];

    var siteName = this.config.get(constants.SITE_NAME_KEY);
    if (siteName) {
      this.log('Project name is ' + chalk.green(siteName) + '.');
    } else {
      prompts.push({
        name: constants.SITE_NAME_KEY,
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

    if (this.config.get(constants.INCLUDE_API_KEY)) {
      this.log('Api already added.');
    } else {
      componentsPrompt.choices.push({
        name: 'Api',
        value: constants.INCLUDE_API_KEY,
        checked: false
      });
    }

    if (this.config.get(constants.INCLUDE_WEB_APP)) {
      this.log('Web App already added.');
    } else {
      componentsPrompt.choices.push({
        name: 'Web App',
        value: constants.INCLUDE_WEB_APP,
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

      setConfigIfValuePresent(constants.SITE_NAME_KEY, props.siteName);
      if (setConfigIfValuePresent(constants.INCLUDE_WEB_APP, hasFeature(constants.INCLUDE_WEB_APP))) {
        this.composeWith('web-booster:web-app');
      }
      if (setConfigIfValuePresent(constants.INCLUDE_API_KEY, hasFeature(constants.INCLUDE_API_KEY))) {
        this.composeWith('web-booster:api');
      }
      config.save();

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), {project: this.config.get(constants.SITE_NAME_KEY)});
      this.fs.copyTpl(this.templatePath('src'), this.destinationPath('src'), {project: this.config.get(constants.SITE_NAME_KEY)});
      this.fs.copyTpl(this.templatePath('util'), this.destinationPath('util'), {project: this.config.get(constants.SITE_NAME_KEY)});
      this.fs.copyTpl(this.templatePath('idea'), this.destinationPath('.idea'), {project: this.config.get(constants.SITE_NAME_KEY)});
    },
  },

  install: function () {
    this.installDependencies();
  }
});
