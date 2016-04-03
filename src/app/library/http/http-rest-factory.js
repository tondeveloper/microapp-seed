/*
    Http/Setting/service
    
    This service library handle all http settings and credentials to allow communication with Anovia REST api.  
*/
(function(){
    'use strict';

    angular.module('Http/Rest/Factory', [])
        .factory('HttpRestApi', Factory)

    /* @ngInject */
    function Factory(HttpHateoasApi) {  

        //My Rest Api Library
        var factory = {
            'ref'      : HttpHateoasApi,
        };
        return factory;

    }
})();