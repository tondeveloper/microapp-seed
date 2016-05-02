'use strict';

var path = require('path');
var gulp = require('gulp');

var $plugin = require('gulp-load-plugins')();

function InjectThemeModule(config){
  this.config = config;
}

InjectThemeModule.prototype.GetTempThemeLight = function(){
  var css = path.join(this.config.paths.tmp, '/serve/styles/light-theme.css');
  console.log(css)
  return gulp.src([css], { read: false });
}
InjectThemeModule.prototype.GetTempThemeDark = function(){
  var css = path.join(this.config.paths.tmp, '/serve/styles/dark-theme.css');
  return gulp.src([css], { read: false });
}

InjectThemeModule.prototype.InjectThemeLightStyles = function(){
  var injectStyles = this.GetTempThemeLight();
  var index = path.join(this.config.paths.tmp, '/serve/index.html');
  var dest  = path.join(this.config.paths.tmp, '/serve');
  var injectOptions = {
    ignorePath: [dest],
    addRootSlash: false,
    name: 'light-theme'
  };
  
  return gulp.src(index)
             .pipe($plugin.inject(injectStyles, injectOptions))
             .pipe(gulp.dest(dest));
}
InjectThemeModule.prototype.InjectThemeDarkStyles = function(){
  var injectStyles = this.GetTempThemeDark();
  var index = path.join(this.config.paths.tmp, '/serve/index.html');
  var dest  = path.join(this.config.paths.tmp, '/serve');
  var injectOptions = {
    ignorePath: [dest],
    addRootSlash: false,
    name: 'dark-theme'
  };

  return gulp.src(index)
             .pipe($plugin.inject(injectStyles, injectOptions))
             .pipe(gulp.dest(dest));
}

InjectThemeModule.prototype.GetThemeScript = function(){
  //var dir = path.join(this.config.paths.src, '/resource');
  var Js = [
      //dir+'/third-party.js',
    ]

  return gulp.src(Js);
}

InjectThemeModule.prototype.InjectThemeScripts = function(){
  var script = this.GetThemeScript();
  var index  = path.join(this.config.paths.tmp, '/serve/index.html');
  var dest   = path.join(this.config.paths.tmp, '/serve');

  var injectOptions = {
    starttag: '<!-- inject:themejs -->',
    ignorePath: [/*this.config.paths.src,*/dest],
    addRootSlash: false,
    relative:true,
  };

  return gulp.src(index)
    .pipe($plugin.inject(script, injectOptions))
    .pipe(gulp.dest(dest));
}

module.exports = function(config){
  return new InjectThemeModule(config);
};