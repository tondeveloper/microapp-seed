(function(){
    'use strict';

    angular.module('Tab/Model/Factory', [])
           .factory('TabModelFactory', Factory)

    /* @ngInject */
    function Factory(){
        function Model(params){
            this.tab         = params.tab || [] ;
            this.current_tab = params.current_tab || null;         
        }
        Model.prototype.IsCurrentTab = function(name){
            return (name === this.current_tab);
        }
        Model.prototype.ChangeTabTo = function(name){
            this.current_tab = name;
        }
        
        function CreateNewInstance(params){
            return new Model(params);
        }
        var factory = {
            'CreateNewInstance':CreateNewInstance
        };

        return factory; 
    }
    
    

})();