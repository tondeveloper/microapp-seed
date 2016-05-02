'use strict';

var path = require('path');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');
var nodemon = require('nodemon');

var util = require('util');

var proxyMiddleware = require('http-proxy-middleware');

function ServerModule(config){
  this.config = config;
}

ServerModule.prototype.StartServerByServe = function(callback){
  var baseDir1 = path.join(this.config.paths.tmp, '/serve');
  var baseDir2 = this.config.paths.src;

  this.BrowserSyncInit([baseDir1, baseDir2]);
  callback();
};

ServerModule.prototype.StartServerByProxy = function(callback){
  var baseDir1 = path.join(this.config.paths.tmp, '/serve');
  var baseDir2 = this.config.paths.src;

  this.BrowserSyncInit([baseDir1, baseDir2], 'default', true);
  callback();
};

ServerModule.prototype.StartServerByDist = function(callback){
  var dir = this.config.paths.dist;
  this.BrowserSyncInit(dir);
  callback();
};

ServerModule.prototype.StartServerByDistProxy = function(callback){
  var dir = this.config.paths.dist;
  this.BrowserSyncInit(dir, 'default', true);
  callback();
};

ServerModule.prototype.BrowserSyncInit = function(baseDir, browser, useproxy) {
  browser = browser || 'default';

  var routes = null;
  //allow any resources in root folders (which may not be allow) to be allowable
  if(baseDir === this.config.paths.src || (util.isArray(baseDir) && baseDir.indexOf(this.config.paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components',
      '/src': this.config.paths.src
    };
  }

  var server = {
    baseDir: baseDir,
    routes: routes
  };

  /*Better SPA support for browser sync*/
  browserSync.use(browserSyncSpa({
    selector: '[ng-app]'// Only needed for angular apps
  }));

  /*
   * You can add a proxy to your backend by uncommenting the line below.
   * You just have to configure a context which will we redirected and the target url.
   * Example: $http.get('/users') requests will be automatically proxified.
   *
   * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.9.0/README.md
   */
  if(useproxy){
    var allowable_proxy = ['/me', '/login', '/spa-config', '/register', '/logout', '/forgot', '/change', '/verify', '/api'];
    var proxy = proxyMiddleware(allowable_proxy, {target: 'http://localhost:3000', changeOrigin: true});
    server.middleware = [proxy];
  }

  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    browser: browser,
  });
};

module.exports = function(config){
  return new ServerModule(config);
};
