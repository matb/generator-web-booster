'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('somefile.js'),
      this.destinationPath('somefile.js')
    );
  }
});
