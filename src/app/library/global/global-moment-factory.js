(function(){

    'use strict';

    angular.module('Global/Moment/Factory', [])
        .run(RunBlock)
        .factory("moment" ,Factory);
    
    /* @ngInject */
    function RunBlock(moment){
        //run Factory
    }
    /* @ngInject */
    function Factory($window){
        var moment = $window.moment;
        return moment;
    }  

})();         