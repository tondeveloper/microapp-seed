/*
    The top level brain for controlling the overall dashboard functions
*/
(function(){
    'use strict';

    angular.module('Section/Panel/Navbar/Application/Directive', ['Global/Ramda/Factory', 'ui.router', 'Root/Route/Const'])
           .directive('navbarapplicationpanel', Directive);

    /* @ngInject */  
    function Directive(){
        return {
            restrict    : 'EA',
            templateUrl : 'app/section/panel/navbar_sidebar/template.html',
            link        : function (scope, element, attr) {},
            controller  : function (R, $state, AppRouteConst){
                var vm = this;
                var map = {
                    'home_dash':{'link':AppRouteConst['APP_HOME_DASH'] ,'matcher':[AppRouteConst['APP_HOME_DASH']]},
                    'landing'  :{'link':AppRouteConst['LANDING']       ,'matcher':[AppRouteConst['LANDING']]},
                };
                vm.GoToPage = function(name){
                    if(R.has(name)(map)){
                        $state.transitionTo(R.prop(name, map).link);
                    }
                };
                vm.IsCurrentState = function(name){
                    if(R.has(name)(map)){
                        return (R.contains($state.current.name, map[name]['matcher']));
                    }else{
                        return false;
                    }
                };     
            },
            controllerAs : 'NavBarCtrl'
        };
    }
})();