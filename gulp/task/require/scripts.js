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

module.exports = function(config){
  return new ScriptModule(config);
};