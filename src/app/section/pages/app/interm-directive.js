(function(){
    'use strict';

    angular.module('Section/Page/App/Interm/Directive', [])
           .directive('appintermsection', Directive);

    /* @ngInject */  
    function Directive(){
        return {
            restrict     : 'EA',
            templateUrl  : 'app/section/pages/app/template.html',
            link         : function (scope, element, attr) {},
            controller   : function ($scope){},
            controllerAs : 'AppCtrl'
        }
    }
})();