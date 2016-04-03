/*
    Http/Setting/service
    
    This service library handle all http settings and credentials to allow communication with Anovia REST api.  
*/
(function(){
    'use strict';

    angular.module('Http/Gateway/Factory', [])
        .factory('HttpGatewayFactory', Factory)

    /* @ngInject */
    function Factory($http) {  

        function Model(){
            this.host = ''; /**/
            this.base = '/api/v1';
            this.settings = {};
            this.headers = {
                'Accept': 'application/vnd.api+json',
            };
        }
        Model.prototype.HttpRef = function(url, params){
            var link = url;
            return $http({
                url     : link,
                headers : this.headers,
                params  : params, 
                method  : "GET",
            });
        }
        Model.prototype.HttpGet = function(url, params){
            var link = this.base + url;
            return $http({
                url     : link,
                headers : this.headers,
                params  : params, 
                method  : "GET",
            });
        }
        Model.prototype.HttpPost = function(url, params, payload){
            var link = this.base + url;
            return $http({
                url     : link,
                headers : this.headers,
                params  : params, 
                data    : payload,
                method  : "POST",
            });
        }
        Model.prototype.HttpPut = function(url, params, payload){
            var link = this.base + url;
            return $http({
                url     : link,
                headers : this.headers,
                params  : params, 
                data    : payload,
                method  : "POST",
            });
        }
        Model.prototype.HttpDelete = function(url, params){
            var link = this.base + url;
            return $http({
                url     : link,
                headers : this.headers,
                params  : params, 
                method  : "DELETE",
            });
        }

        //Instantiate this class as a singleton
        var factory = new Model();
        return factory;

    }
})();