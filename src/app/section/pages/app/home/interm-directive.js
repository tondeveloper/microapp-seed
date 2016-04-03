(function(){
    'use strict';

    angular.module('Section/Page/Home/Interm/Directive', [])
           .directive('homeintermsection', Directive);

    /* @ngInject */  
    function Directive(){
        return {
            restrict    : 'EA',
            templateUrl : 'app/section/panel/interm/template.html',
            link: function (scope, element, attr) {},
            controller   : function ($scope){},
            controllerAs : 'Ctrl',
        }
    }
})();