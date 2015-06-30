'use strict';
var yeoman = require('yeoman-generator');
var constants = require('../../shared/constants');
module.exports = yeoman.generators.Base.extend({
  initializing: function () {
  },

  writing: function () {
    this.fs.copyTpl(this.templatePath(), this.destinationPath('src/api'), {project: this.config.get(constants.SITE_NAME_KEY)});
  }
});
