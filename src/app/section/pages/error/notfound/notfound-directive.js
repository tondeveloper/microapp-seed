/*
    The top level brain for controlling the overall dashboard functions
*/
(function(){
    'use strict';

    angular.module('Section/Page/Error/NotFound/Directive', [])
           .directive('errornotfoundsection', Directive);

    /* @ngInject */  
    function Directive(){
        return {
            restrict    : 'EA',
            templateUrl : 'app/section/pages/error/notfound/template.html',
            link: function (scope, element, attr) {
                var vm = scope.ErrorCtrl;
            },
            controller   : function ($scope){
                console.log('Hi i am 404 controller')
            },
            controllerAs : 'ErrorCtrl'
        }
    }
})();