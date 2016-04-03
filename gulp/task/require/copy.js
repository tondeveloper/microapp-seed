'use strict';

var path = require('path');
var gulp = require('gulp');

function CopyModule(config){
  this.config = config;
}
CopyModule.prototype.CopyIndexHtmlSrcToTemp = function(){
  var index = path.join(this.config.paths.src, '/index.html');
  var dest  = path.join(this.config.paths.tmp, '/serve');
  return gulp.src([index])
             .pipe(gulp.dest(dest));
}

CopyModule.prototype.CopyFaviconSrcToDist = function(){
  var index = path.join(this.config.paths.src, '/favicon.ico');
  var dest  = path.join(this.config.paths.dist, '/');
  return gulp.src([index])
             .pipe(gulp.dest(dest));
}

CopyModule.prototype.CopyImagesSrcToDist = function(){
  var index = path.join(this.config.paths.src, 'assets/img/**/*');
  var dest  = path.join(this.config.paths.dist, '/assets/img');
  return gulp.src([index])
             .pipe(gulp.dest(dest));
}

CopyModule.prototype.CopyFontTempToDist = function(){
  var index = path.join(this.config.paths.tmp, '/serve/fonts/**/*');
  var dest  = path.join(this.config.paths.dist, '/fonts');
  return gulp.src([index])
             .pipe(gulp.dest(dest));
}

module.exports = function(config){
  return new CopyModule(config);
};