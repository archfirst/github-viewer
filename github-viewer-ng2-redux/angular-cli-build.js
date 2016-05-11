/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/*.js',
      'es6-shim/es6-shim.js',
      'reflect-metadata/*.js',
      'rxjs/**/*.js',
      '@angular/**/*.js',
      'ng2-redux/**/*.js',
      'redux/**/*.js',
      'redux-thunk/**/*.js',
      'invariant/**/*.js',
      'lodash/**/*.js',
      'is-plain-obj/**/*.js',
      'symbol-observable/**/*.js'
    ]
  });
};
