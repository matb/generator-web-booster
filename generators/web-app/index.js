'use strict';
var yeoman = require('yeoman-generator');
var constants = require('../../shared/constants');
var angularUtil = require('../../shared/angularUtil');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
  },

  writing: function () {
    var project = this.config.get(constants.SITE_NAME_KEY);
    this.fs.copyTpl(this.templatePath(), this.destinationPath('src/webapp'), {
      project: project,
      angularModule: angularUtil.toAngularModuleName(project)
    });
  }
});

