(function(){
    'use strict';

    angular.module('Section/Page/Home/Dashboard/Factory', ['Global/Ramda/Factory','Filter/Date/Factory', 'Tab/Model/Factory'])
           .factory('HomeDashBoardStateFactory', Factory)

    /* @ngInject */
    function Factory(R, $q, $window, FilterDateFactory, TabModelFactory){


        /*TAB COMPONENT*/
        var Tab = function(){
          this.instance = TabModelFactory.CreateNewInstance(this.Init());
        }
        Tab.prototype.Init = function(){
          return {
            tab:['Tab1', 'Tab2', 'Tab3'],
            current_tab:'Tab1'
          }
        }



        /*THIS MODEL*/
        var Model = function(){
            this.component = {
                'tab':new Tab(),
            }
        };
        Model.prototype.Init = function(){ 

        }

        var factory = new Model();
        return factory;
    }
})();