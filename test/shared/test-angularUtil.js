'use strict';
var assert = require('chai').assert;
var angularUtil = require('../../shared/angularUtil')

describe('toAngularModuleName', function () {
  function testModuleName(input, expected) {
    assert.equal(angularUtil.toAngularModuleName(input), expected);
  }

  it('does not change valid name', function () {
    var name = 'valid';
    testModuleName(name, name);
  });

  it('forces camel case', function () {
    testModuleName('Module', 'module');
  });

  it('removes special characters', function () {
    testModuleName('Modu!le', 'module');
    testModuleName('Modu-le', 'module');
    testModuleName('Modu%le', 'module');
    testModuleName('Modu?le', 'module');
    testModuleName('Mod^ule', 'module');
    testModuleName('Modu$le', 'module');
  });


  it('removes spaces', function () {
    testModuleName('Module Name', 'moduleName');
  });
});
