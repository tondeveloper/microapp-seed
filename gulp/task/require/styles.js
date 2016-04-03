'use strict';

var path = require('path');
var gulp = require('gulp');

var browserSync = require('browser-sync');


function StyleModule(config){
  this.config = config;
}

StyleModule.prototype.UpdateStylesStreams = function(){
  var styles = path.join(this.config.paths.tmp, 'serve/styles/**/*.css');
  return gulp.src([ styles ])
             .pipe(browserSync.stream());
};

module.exports = function(config){
  return new StyleModule(config);
};