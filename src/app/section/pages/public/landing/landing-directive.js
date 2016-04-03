/*
    The top level brain for controlling the overall dashboard functions
*/
(function(){
    'use strict';

    angular.module('Section/Page/Public/Landing/Directive', ['Root/Route/Const', 'ui.router'])
           .directive('publiclandingsection', Directive);

    /* @ngInject */  
    function Directive(AppRouteConst, $state){
        return {
            restrict    : 'EA',
            templateUrl : 'app/section/pages/public/landing/template.html',
            link: function (scope, element, attr) {},
            controller   : function (){
                var vm = this;
                vm.link1 = AppRouteConst['APP_HOME_DASH'];
                vm.link2 = AppRouteConst['404'];
                vm.link3 = AppRouteConst['403'];
                vm.Goto = function(route){
                    $state.transitionTo(route);
                }
            },
            controllerAs : 'LandingCtrl'
        }
    }
})();