'use strict';

var path    = require('path');
//var config  = require('./gulp/config')('client/');
var _       = require('lodash');
var wiredep = require('wiredep');
var fs    = require('fs');

function listFiles() {
  var p = 'src';
  var w = {
    'exclude': [/\/bootstrap\.js$/, /\/bootstrap\.css/],
    'directory': 'bower_components',
    'bowerJson': JSON.parse(fs.readFileSync('bower.json'))
  };

  var pathSrcHtml = [ path.join(p, '/**/*.html')];

  var wiredepOptions = _.extend({}, w, {
    dependencies: true,
    devDependencies: true
  });

  var patterns = wiredep(wiredepOptions).js
    .concat([
      path.join(p, '/app/**/*.module.js'),
      path.join(p, '/app/**/*.js'),
      path.join(p, '/**/*.spec.js'),
      path.join(p, '/**/*.mock.js'),
      './node_modules/phantomjs-polyfill/bind-polyfill.js', //Added because phantom JS does not support prototype.bind()
    ])
    .concat(pathSrcHtml);

  var files = patterns.map(function (pattern) {
    return {
      'pattern': pattern
    };
  });
  files.push({
    'pattern' : path.join(p, '/assets/**/*'),
    'included': false,
    'served'  : true,
    'watched' : false
  });
  return files;
}

module.exports = function(c) {
  var p = 'src';

  var settings = {
    'files': listFiles(),
    'singleRun': true,
    'autoWatch': false,
    'ngHtml2JsPreprocessor': {
      'stripPrefix': p + '/',
      'moduleName': 'client/Template'
    },
    'logLevel': 'WARN',
    'frameworks': ['jasmine', 'angular-filesort'],
    'angularFilesort': {
      'whitelist': [path.join(p, '/**/!(*.html|*.spec|*.mock).js')]
    },
    'browsers' : ['PhantomJS'],
    'plugins' : [
      'karma-phantomjs-launcher',
      'karma-angular-filesort',
      'karma-coverage',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor'
    ],
    'coverageReporter': {
      'type' : 'html',
      'dir'  : 'coverage/client/'
    },
    'reporters': ['progress'],
    'proxies': {
      '/assets/': path.join('/base/', p, '/assets/')
    }
  };

  // This is the default preprocessors configuration for a usage with Karma cli
  // The coverage preprocessor is added in gulp/unit-test.js only for single tests
  // It was not possible to do it there because karma doesn't let us now if we are
  // running a single test or not
  var pathSrcHtml = [ path.join(p, '/**/*.html')];
  settings.preprocessors = {};
  pathSrcHtml.forEach(function (pathing) {
    settings.preprocessors[pathing] = ['ng-html2js'];
  });

  // This block is needed to execute Chrome on Travis
  // If you ever plan to use Chrome and Travis, you can keep it
  // If not, you can safely remove it
  // https://github.com/karma-runner/karma/issues/1144#issuecomment-53633076
  if(settings.browsers[0] === 'Chrome' && process.env.TRAVIS) {
    settings.customLaunchers = {
      'chrome-travis-ci': {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    };
    settings.browsers = ['chrome-travis-ci'];
  }

  c.set(settings);
};
