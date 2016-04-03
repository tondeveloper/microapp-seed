'use strict';

var path = require('path');
var gulp = require('gulp');

var $plugin = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');



function InjectModule(config){
  this.config = config;
}
InjectModule.prototype.ErrorHandler = function(title){
  return this.config.errorHandler(title);
}
//get all script defined below and sort them in alpha
InjectModule.prototype.GetScript = function(){
  var Js         = path.join(this.config.paths.src, '/app/**/*.js');
  var IgnoreSpec = path.join('!' + this.config.paths.src, '/app/**/*.spec.js');
  var IgnoreMock = path.join('!' + this.config.paths.src, '/app/**/*.mock.js');

  return gulp.src([Js, IgnoreSpec, IgnoreMock])
             .pipe($plugin.angularFilesort())
             .on('error', this.ErrorHandler('AngularFilesort'));
}


/* 
  All Injection assumes that index.html has been copied from source to .tmp folder
  Otherwise these operation will fail
*/

//inject all app js into .tmp index html
InjectModule.prototype.InjectAppScripts = function(){
  var script = this.GetScript();
  var index  = path.join(this.config.paths.tmp, '/serve/index.html');
  var dest   = path.join(this.config.paths.tmp, '/serve');

  var injectOptions = {
    ignorePath: [this.config.paths.src,dest],
    addRootSlash: false,
    relative:true
  };

  return gulp.src(index)
    .pipe($plugin.inject(script, injectOptions))
    .pipe(gulp.dest(dest));
}

//Inject all bower related css and scripts into .tmp index html
InjectModule.prototype.InjectBower = function(){
  var index = path.join(this.config.paths.tmp, '/serve/index.html');
  var dest  = path.join(this.config.paths.tmp, '/serve');

  var injectOptions = {
    ignorePath: [/*dest*/],
    addRootSlash: false
  };

  var wiredepOptions = this.config.wiredep;

  return gulp.src(index)
    .pipe(wiredep(_.extend({}, wiredepOptions)))
    .pipe(gulp.dest(dest));
}

//inject converted html js into .tmp index html
InjectModule.prototype.InjectAngularTemplatePartials = function(){
  var partialsScript = path.join(this.config.paths.tmp, 'serve/scripts/html.js');
  var index = path.join(this.config.paths.tmp, '/serve/index.html');
  var dest  = path.join(this.config.paths.tmp, '/serve');

  var partialsInjectFile = gulp.src(partialsScript, { read: false });
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: path.join(this.config.paths.tmp, '/serve/'),
    addRootSlash: false
  };
  return gulp.src(index)
             .pipe($plugin.inject(partialsInjectFile, partialsInjectOptions))
             .pipe(gulp.dest(dest));
}

module.exports = function(config){
  return new InjectModule(config);
};