'use strict';

var path = require('path');
var gulp = require('gulp');

var browserSync = require('browser-sync');
var $plugin = require('gulp-load-plugins')();



function ScriptModule(config){
  this.config = config;
}

ScriptModule.prototype.UpdateScriptsStreams = function(){
  var Js = path.join(this.config.paths.src, '/app/**/*.js');

  return gulp.src(Js).pipe(browserSync.stream());
}

ScriptModule.prototype.LintScripts = function() {
  var Js = path.join(this.config.paths.src, '/app/**/*.js');

  return gulp.src(Js)
             .pipe($plugin.eslint())
             .pipe($plugin.eslint.format())
             .pipe($plugin.size())
};


ScriptModule.prototype.LintServerScripts = function() {
  var Js = path.join(this.config.paths.root, 'lib/**/*.js');
  var Js2 = path.join(this.config.paths.root, 'api/**/*.js');
 
  return gulp.src([Js,Js2])
             .pipe($plugin.eslint())
             .pipe($plugin.eslint.format())
             .pipe($plugin.size())
};

ScriptModule.prototype.LintCssThemes = function(){
  var PathAssets   = path.join(this.config.paths.src, '/assets');
  var PathResource = path.join(this.config.paths.src, '/resources');
  var lessOptions = {
    'options': [PathAssets,PathResource]
  };

  var Dark = path.join(this.config.paths.src, '/assets/theme/dark-theme.less');
  var Light = path.join(this.config.paths.src, '/assets/theme/light-theme.less');

  return gulp.src([ Dark, Light ])
    .pipe($plugin.less(lessOptions)).on('error', throwError.bind(this));

  function throwError(e){
    this.config.errorHandler('Css');
    var test_error = new Error('Linting css themes has produce errors.')
    throw test_error;
  }
};

module.exports = function(config){
  return new ScriptModule(config);
};