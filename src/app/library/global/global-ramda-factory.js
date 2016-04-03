(function(){

    'use strict';

    angular.module('Global/Ramda/Factory', [])
        .run(RunBlock)
        .factory("R" ,Factory);
    
    /* @ngInject */
    function RunBlock(R){
        //run Factory
    }
    /* @ngInject */
    function Factory($window){
        var R = $window.R;
        return R;
    }  

})();         