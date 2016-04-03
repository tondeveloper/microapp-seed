(function() {
  'use strict';

  angular.module('Root/Setting/Config', [])
         .config(Config);

  /* @ngInject */
  function Config($logProvider, $locationProvider, $httpProvider, $compileProvider, $rootScopeProvider) {
    
    $logProvider.debugEnabled(true);                    // Enable log

    $locationProvider.html5Mode(false).hashPrefix('');  //This Mode Require a <base> tag in the html. The href is location of the index.html path

    $httpProvider.useApplyAsync(true);                  //when requests are loaded, they will schedule a deferred "apply" on the next tick, giving time for subsequent requests in a roughly ~10ms window to load and share the same digest cycle.

    $compileProvider.debugInfoEnabled(true);            //put to False this in production mode for performace boost

    $rootScopeProvider.digestTtl(30);                   //limit the digest cycle to prevent crash
  }

})();
