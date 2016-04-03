(function() {
  'use strict';

  angular.module('Root/Route/Const',[])
         .constant('AppRouteConst', Constant());

  /* @ngInject */
  function Constant(){
    return {
      '404'                 : 'app.forbidden',
      '403'                 : 'app.notfound',
      'LANDING'             : 'app.landing',
      'APP'                 : 'app.main',
      'APP_HOME_ROOT'       : 'app.main.home',
      'APP_HOME_DASH'       : 'app.main.home.dash'
    }
  }

})();