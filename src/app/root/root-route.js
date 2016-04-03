(function() {
  'use strict';

  angular.module('Root/Route/Config',['ui.router', 'Root/Route/Const'])
         .config(RouterConfig);


  /* @ngInject */
  function RouterConfig($stateProvider, $urlRouterProvider, AppRouteConst) {

    $urlRouterProvider
            .when('',                                          RouteToLanding)
            .when('/',                                         RouteToLanding)
            .when('/dashboard',                                RouteToDashboard)
            .when('/p/dashboard',                              RouteToDashboard)
            .when('/403',                                      RouteTo403)
            .when('/404',                                      RouteTo404)
            .otherwise('/404');

    /* @ngInject */
    function RouteToLanding($state){
      $state.go(AppRouteConst['LANDING']);
    }
    /* @ngInject */
    function RouteToDashboard($state){
      $state.go(AppRouteConst['APP_HOME_DASH']);
    }
    /* @ngInject */
    function RouteTo403($state){
      $state.go(AppRouteConst['403']);
    }
    /* @ngInject */
    function RouteTo404($state){
      $state.go(AppRouteConst['404']);
    }

    $stateProvider
      /* Load a base template and resolve any dependancy */
      .state('app', {
          template: '<RootIntermSection></RootIntermSection>',
          abstract:true,
          resolve:{}
      })
            .state('app.landing', {
                url: '/',
                template: '<PublicLandingSection></PublicLandingSection>',
            })
            .state(AppRouteConst['APP'], {
                abstract:true,
                template: '<AppIntermSection></AppIntermSection>',
            })
                  .state(AppRouteConst['APP_HOME_ROOT'], {
                    abstract:true,
                    template: '<HomeIntermSection></HomeIntermSection>',
                  })
                        .state(AppRouteConst['APP_HOME_DASH'], {
                          url: '/dashboard',
                          template: '<HomeDashBoardSection></HomeDashBoardSection>',
                        })
            .state(AppRouteConst['403'], {
              url: '/403',
              template: '<ErrorForbiddenSection></ErrorForbiddenSection>'
            })        
            .state(AppRouteConst['404'], {
              url: '/404',
              template: '<ErrorNotFoundSection></ErrorNotFoundSection>'
            });
  }

})();
