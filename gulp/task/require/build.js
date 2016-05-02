'use strict';

/*
    THIS MODULE IS USED TO GENERATE Partials and Dist folder
*/

var path = require('path');
var gulp = require('gulp');

var $plugin = require('gulp-load-plugins')({pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license']});




function BuildModule(config){
  this.config = config;
}

BuildModule.prototype.ErrorHandler = function(title){
  return this.config.errorHandler(title);
}

BuildModule.prototype.BuildAngularTemplatePartials = function(){

  var partials = path.join(this.config.paths.src, '/app/**/*.html');
  var dest = path.join(this.config.paths.tmp, 'serve/scripts/');
  return gulp.src([partials])
             .pipe($plugin.minifyHtml({
               empty: true,
               spare: true,
               quotes: true
             }))
             .pipe($plugin.angularTemplatecache('html.js', {
               module: 'client',
               root: 'app'
             }))
             .pipe(gulp.dest(dest)).on('error', function (err) {
                // Make sure failed tests cause gulp to exit non-zero
                throw err;
             });
}


BuildModule.prototype.BuildDistFolder = function(){

  var index = path.join(this.config.paths.tmp, '/serve/index.html');

  return gulp.src(index)
             .pipe($plugin.useref())

             .pipe($plugin.if('*.js', $plugin.rev()))
             .pipe($plugin.if('*.js', $plugin.sourcemaps.init()))
             .pipe($plugin.if('*.js', $plugin.ngAnnotate()))
             .pipe($plugin.if('*.js', $plugin.uglify({ preserveComments: $plugin.uglifySaveLicense })).on('error', this.ErrorHandler('Uglify')))
             .pipe($plugin.if('*.js', $plugin.sourcemaps.write('maps')))
             //.pipe($plugin.if('*.js', $plugin.gzip({ append: true })))

             .pipe($plugin.if('*.css',$plugin.rev()))
             .pipe($plugin.if('*.css',$plugin.sourcemaps.init()))
             .pipe($plugin.if('*.css',$plugin.cssnano()))
             .pipe($plugin.if('*.css',$plugin.sourcemaps.write('maps')))
             //.pipe($plugin.if('*.css',$plugin.gzip({ append: true })))

             .pipe($plugin.revReplace())

             .pipe(gulp.dest(path.join(this.config.paths.dist, '/')))
             .pipe($plugin.size({ title: path.join(this.config.paths.dist, '/'), showFiles: true }));
}

BuildModule.prototype.VerifyDistFolder = function(){

  var array = [
    path.join(this.config.paths.dist, '/index.html'),
    path.join(this.config.paths.dist, '/favicon.ico'),

    path.join(this.config.paths.dist, '/assets'),
    path.join(this.config.paths.dist, '/fonts'),
    path.join(this.config.paths.dist, '/maps'),
    path.join(this.config.paths.dist, '/scripts'),
    path.join(this.config.paths.dist, '/styles'),

    path.join(this.config.paths.dist, '/scripts/app-*.js'),
    path.join(this.config.paths.dist, '/scripts/html-*.js'),
    path.join(this.config.paths.dist, '/scripts/vendor-*.js'),

    path.join(this.config.paths.dist, '/styles/dark-theme-*.css'),
    path.join(this.config.paths.dist, '/styles/light-theme-*.css'),
    path.join(this.config.paths.dist, '/styles/vendor-*.css'),

    path.join(this.config.paths.dist, '/maps/scripts/app-*.js.map'),
    path.join(this.config.paths.dist, '/maps/scripts/html-*.js.map'),
    path.join(this.config.paths.dist, '/maps/scripts/vendor-*.js.map'),

    path.join(this.config.paths.dist, '/maps/styles/dark-theme-*.css.map'),
    path.join(this.config.paths.dist, '/maps/styles/light-theme-*.css.map'),
    path.join(this.config.paths.dist, '/maps/styles/vendor-*.css.map'),
  ];

  return gulp.src(array)
             .pipe($plugin.expectFile(array))
             .on('error', this.ErrorHandler('VerifyBuild'));
}

module.exports = function(config){
  return new BuildModule(config);
};