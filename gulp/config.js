'use strict';

/*
  
  This module is used to store configuation

 */
var gutil = require('gulp-util');
var fs    = require('fs');

function ConfigModule(config){

  var clientDir = config['client_dir'];

  this.paths = {
    'root'  : '',
    'client': clientDir,
    'src'   : clientDir+'src',
    'dist'  : clientDir+'public',
    'tmp'   : clientDir+'.tmp',
    'e2e'   : clientDir+'e2e',
    'bower' : clientDir+'bower_components'
  };

  this.wiredep = {
    'exclude': [/\/bootstrap\.js$/, /\/bootstrap\.css/],
    'directory': clientDir+'bower_components',
    'bowerJson': JSON.parse(fs.readFileSync('bower.json'))
  };
}

ConfigModule.prototype.errorHandler = function(title) {
  return function (err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};

module.exports = function(config){
  return new ConfigModule(config);
}
