(function(){

    'use strict';

    angular.module('Global/Jquery/Factory', [])
        .run(RunBlock)
        .factory("jquery" , Factory);
    
    /* @ngInject */
    function RunBlock(jquery){
        //run Factory
    }
    /* @ngInject */
    function Factory($window){
        var jquery = $window.$;
        return jquery;
    }  

})();         