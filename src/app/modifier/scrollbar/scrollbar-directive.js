(function(){
    'use strict';

    angular.module('ScrollBar/Modifier/Directive', ['Global/PerfectScrollBar/Factory'])
        .directive('perfectscrollbarmodifier', PerfectScrollBar)

    /* @ngInject */  
    function PerfectScrollBar(perfectscrollbar){
        return {
            restrict : 'A',
            scope:{'p-suppressx':'=','p-suppressy':'='},
            link : function (scope, element, attr) {
                var Ps = perfectscrollbar;
                var container = element[0];

                Ps.initialize(container, {
                  suppressScrollX:scope.suppressx || false,
                  suppressScrollY:scope.suppressy || false,
                  wheelSpeed: 2,
                  wheelPropagation: true,
                  minScrollbarLength: 20,
                  scrollXMarginOffset:5,
                  scrollYMarginOffset:5,
                  useSelectionScroll:true
                });

                /*var watch = scope.$watch(function ReturnHeight(){ console.log(element);return element[0].height(); }, function (n,o){
                    if(n != null){
                        Ps.update(container);
                    }
                });*/

                scope.$on('$destroy', function() {
                    //Ps.destroy(container);
                });
            }
        }
    }

    
})();    