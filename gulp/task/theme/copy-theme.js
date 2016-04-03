'use strict';

/*
    This module is used to copy theme 
*/

var path   = require('path');
var gulp   = require('gulp');
var plugin = require('gulp-load-plugins')();

function CopyThemeModule(config){
  this.config = config;
}

CopyThemeModule.prototype.CopyThemeFontsSrcToTemp = function(){
  var font = path.join(this.config.paths.src, '/resource/bootstrap-theme-dashboard/fonts/*');
  var dest = path.join(this.config.paths.tmp, '/serve/fonts/');
  return gulp.src([font])
    .pipe(plugin.filter('**/*.{eot,svg,ttf,woff,woff2,otf}'))
    .pipe(plugin.flatten())
    .pipe(gulp.dest(dest));
}

CopyThemeModule.prototype.CopyThemeFontAwesomeSrcToTemp = function(){
  var font = path.join(this.config.paths.root, 'bower_components/font-awesome/fonts/*');
  var dest = path.join(this.config.paths.tmp, '/serve/fonts/');
  return gulp.src([font])
    .pipe(plugin.filter('**/*.{eot,svg,ttf,woff,woff2,otf}'))
    .pipe(plugin.flatten())
    .pipe(gulp.dest(dest));
}

module.exports = function(config){
  return new CopyThemeModule(config);
};
