'use strict';

var gulp   = require('gulp');
var run    = require('run-sequence');


var config_setting = {
  'client_dir':''
};

var config = require('./gulp/config.js')(config_setting);

var init_setting = {
  'gulp'  :gulp,
  'run'   :run,
  'config':config,
};

var task   = require('./gulp/task.js')(init_setting);
var myTask = task;

/*  

See gulp/task.js for all task  

gulp test
gulp serve
gulp serve:build
gulp serve:proxy
gulp serve:proxy:nodemon
gulp build

*/

