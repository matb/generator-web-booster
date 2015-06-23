'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {

    this.log('You called the MeanBoilerplate subgenerator with the argument ' + this.name + '.');
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('somefile.js'),
      this.destinationPath('somefile.js')
    );
  }
});
