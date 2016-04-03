'use strict';

/*
  This Module is used to delete folders
*/

var del = require('del');
var path = require('path');  


function CleanModule(config){
  this.config = config;
  return this;
}
CleanModule.prototype.CleanDistFolder = function() {
  var DistFolder = path.join(this.config.paths.dist, '/');
  return del([DistFolder]);
};
CleanModule.prototype.CleanTempFolder = function() {
  var TempFolder = path.join(this.config.paths.tmp, '/');
  return del([TempFolder]);
};

module.exports = function(config){
  return new CleanModule(config);
}