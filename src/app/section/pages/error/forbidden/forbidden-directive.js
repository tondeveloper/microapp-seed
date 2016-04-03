/*
    The top level brain for controlling the overall dashboard functions
*/
(function(){
    'use strict';

    angular.module('Section/Page/Error/Forbidden/Directive', [])
           .directive('errorforbiddensection', Directive);

    /* @ngInject */  
    function Directive(){
        return {
            restrict    : 'EA',
            templateUrl : 'app/section/pages/error/forbidden/template.html',
            link: function (scope, element, attr) {
                var vm = scope.ErrorCtrl;
            },
            controller   : function ($scope){
                console.log('Hi i am 403 controller')
            },
            controllerAs : 'ErrorCtrl'
        }
    }
})();