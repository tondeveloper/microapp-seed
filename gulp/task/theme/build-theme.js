'use strict';


/*
    THIS MODULE IS USED TO GENERATE THEME IN ASSET/THEME FOLDER
*/


var path = require('path');
var gulp = require('gulp');

var $plugin = require('gulp-load-plugins')();



function BuildThemeModule(config){
  this.config = config;
}

BuildThemeModule.prototype.ErrorHandler = function(title){
  return this.config.errorHandler(title);
}

/*** all BuildStyles Concat all Import less, Autoprefixes to fit most browser, write to .tmp destination ***/

BuildThemeModule.prototype.BuildStylesLightTheme = function() {
  var PathAssets   = path.join(this.config.paths.src, '/assets');
  var PathResource = path.join(this.config.paths.src, '/resource');
  var lessOptions = {
    'options': [PathAssets,PathResource]
  };

  var Target = path.join(this.config.paths.src, '/assets/theme/light-theme.less')

  return gulp.src([ Target ])
    .pipe($plugin.less(lessOptions)).on('error', this.ErrorHandler('Less'))
    .pipe($plugin.autoprefixer()).on('error', this.ErrorHandler('Autoprefixer'))
    .pipe(gulp.dest(path.join(this.config.paths.tmp, '/serve/styles/')));
};


BuildThemeModule.prototype.BuildStylesDarkTheme = function() {
  var PathAssets   = path.join(this.config.paths.src, '/assets');
  var PathResource = path.join(this.config.paths.src, '/resource');
  var lessOptions = {
    'options': [PathAssets,PathResource]
  };

  var Target = path.join(this.config.paths.src, '/assets/theme/dark-theme.less')

  return gulp.src([ Target ])
    .pipe($plugin.less(lessOptions)).on('error', this.ErrorHandler('Less'))
    .pipe($plugin.autoprefixer()).on('error', this.ErrorHandler('Autoprefixer'))
    .pipe(gulp.dest(path.join(this.config.paths.tmp, '/serve/styles/')));
};

//you can add more theme below - just copy pasta

module.exports = function(config){
  return new BuildThemeModule(config);
};