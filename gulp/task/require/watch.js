'use strict';

var path = require('path');
var gulp = require('gulp');

var browserSync = require('browser-sync');

function WatchModule(config){
  this.config = config;
}

WatchModule.prototype.WatchStyle = function(){
  var css      = path.join(this.config.paths.src, '/assets/**/*.css');
  var less     = path.join(this.config.paths.src, '/assets/**/*.less');
  var resource = path.join(this.config.paths.src, '/resource/**/*.less');

  return gulp.watch([css, less, resource], function (event) {
    if(event.type === 'changed') {
      gulp.start('reload-style');
    }/* else {
      gulp.start('inject-reload');
    }*/
  });
}


WatchModule.prototype.WatchScript = function(){
  var js = path.join(this.config.paths.src, '/app/**/*.js');

  return gulp.watch([js], function (event) {
    if(event.type === 'changed') {
      gulp.start('reload-script');
    } else {
      gulp.start('reload-script');
    }
  });
}


WatchModule.prototype.WatchHtml = function(){
  var index = path.join(this.config.paths.src, '/index.html');
  var html = path.join(this.config.paths.src, '/app/**/*.html');

  return gulp.watch([index, html], function (event) {
    browserSync.reload(event.path);
  });
}

module.exports = function(config){
  return new WatchModule(config);
};

