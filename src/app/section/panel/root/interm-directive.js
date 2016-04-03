/*
    The top level brain for controlling the overall app functions
*/
(function(){
    'use strict';

    angular.module('Section/Root/Directive', [])
           .directive('rootintermsection', Directive);

    /* @ngInject */  
    function Directive(){
        return {
            restrict     : 'EA',
            templateUrl  : 'app/section/panel/root/template.html',
            link         : function (scope, element, attr) {},
            controller   : function ($scope){},
            controllerAs : 'RootCtrl'
        }
    }
})();