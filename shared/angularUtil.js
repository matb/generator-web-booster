'use strict';

/**
 * Converts a given name to an angular compatible module name that has no special characters and starts with a lowercase letter
 *
 * @param name {string}- Name that should be converted to the angular module name
 */
module.exports.toAngularModuleName = function (name) {
  // remove all special characters
  name = name.replace(/[^a-zA-Z0-9]/g, '');
  return name[0].toLowerCase() + name.substr(1);
}
