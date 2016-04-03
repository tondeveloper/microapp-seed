/*
    The top level brain for controlling the overall dashboard functions
*/
(function(){
    'use strict';

    angular.module('Section/Page/Home/Dashboard/Directive', [ 'Section/Page/Home/Dashboard/Factory'])
           .directive('homedashboardsection', Directive);

    /* @ngInject */  
    function Directive(HomeDashBoardStateFactory){
        return {
            restrict    : 'EA',
            templateUrl : 'app/section/pages/app/home/dash/template.html',
            link: function (scope, element, attr) {},
            controller   : function (){
                var vm = this;
                    vm.instance = HomeDashBoardStateFactory;
                    vm.instance.Init();
            },
            controllerAs : 'Ctrl',
        }
    }
})();