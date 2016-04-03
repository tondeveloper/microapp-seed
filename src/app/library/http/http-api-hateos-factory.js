
(function(){
    'use strict';

    angular.module('Http/Api/JsonApiHateoas/Factory', ['Http/Gateway/Factory'])
        .factory('HttpHateosApi', Factory)

    /* @ngInject */
    function Factory(HttpGatewayFactory) {  

        function Model(){

        }

        Model.prototype.follow = function (url, params){
            return HttpGatewayFactory.HttpRef(url, params);
        }
        
        //Instantiate this class as a singleton
        var factory = new Model();
        return factory;
    }

})();