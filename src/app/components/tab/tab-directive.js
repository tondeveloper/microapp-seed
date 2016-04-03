/*
    'Feature/Document/Directive'

    This Directive library help process a Panel Window (inside Panel Container).
    Each Panel Window view is set by Panel Container
    Panel Window control the window tools such as collapse, resize,  
*/
(function(){
    'use strict';

    angular.module('Tab/Component/Directive', [])
        .directive('tabcomponentdirective', Directive);

    /* @ngInject */  
    function Directive(){
        return {
            restrict     : 'EA',
            scope        : {'instance': '='} ,
            templateUrl  : function template(element, attr){
                return attr['template'] || 'app/components/tab/tab-default-template.html';
            },
            link         : function link(scope, element, attr){},
            controller   : function(){
                var vm = this;
            },
            controllerAs : 'TabCtrl',
            bindToController: true , 
        }
    }

    


})();