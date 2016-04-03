'use strict';

var path = require('path');
var gulp = require('gulp');

var karma = require('karma');

function UnitTestModule(config){
  this.config = config;
}

UnitTestModule.prototype.RunTests = function(isRunOnce, callback) {
  var pathSrcHtml = [path.join(this.config.paths.src, '/**/*.html')];
  var pathSrcJs = [path.join(this.config.paths.src, '/**/!(*.spec).js')];
  var reporters = ['progress'];
  var preprocessors = {};

  pathSrcHtml.forEach(function (path) {
    preprocessors[path] = ['ng-html2js'];
  });

  if (isRunOnce) {
    pathSrcJs.forEach(function (path) {
      preprocessors[path] = ['coverage'];
    });
    reporters.push('coverage');
  }

  //__dirname is important because it requires the full path from disk to this directory 
  var localConfig = {
    'configFile'   : path.join(__dirname,'../../../','karma.conf.js'),
    'singleRun'    : isRunOnce,
    'autoWatch'    : !isRunOnce,
    'reporters'    : reporters,
    'preprocessors': preprocessors
  };

  var DisplayError = function (failCount) {
    (failCount ? new Error("Failed " + failCount + " tests.") : null);
  }

  var server = new karma.Server(localConfig, DisplayError);
      server.start();

  callback();
}

module.exports = function(config){
  return new UnitTestModule(config);
};
