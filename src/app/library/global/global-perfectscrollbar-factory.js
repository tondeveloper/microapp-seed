
/*
    Use this factory to link if you are loading a third party library called PerfectScrollBar as a Dependency
    https://github.com/noraesae/perfect-scrollbar
*/
(function(){

    'use strict';

    angular.module('Global/PerfectScrollBar/Factory', [])
        .run(RunBlock)
        .factory("perfectscrollbar" ,Factory);
    
    /* @ngInject */
    function RunBlock(perfectscrollbar){
        //run Factory
    }
    /* @ngInject */
    function Factory($window){
        var Ps = $window.Ps;
        return Ps;
    }  

})();    