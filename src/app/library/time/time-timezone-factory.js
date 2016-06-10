
(function(){
    'use strict';

    angular.module('Time/Timezone/Factory', ['Global/Ramda/Factory', 'Global/Moment/Factory', 'ngCookies'])
        .factory('TimeTimezoneFactory', Factory)

    /* @ngInject */
    function Factory(R, moment, $cookies) {  

        function Model(timeZoneList){
            this.timezone_label = 'US/Central';
            this.timezone_list = timeZoneList;
        }
        Model.prototype.SetCurrentTimezoneLabel = function(string){
            this.timezone_label = string;
        }
        Model.prototype.StorePreferenceLabel = function(string){
            $cookies.put('timezone_label', string);
        }
        Model.prototype.RetrievePreferenceLabel = function(){
            return $cookies.get('timezone_label');
        }
        Model.prototype.ProcessTimezoneLabel = function(string){
            this.SetCurrentTimezoneLabel(string);
            this.StorePreferenceLabel(string);
        }
        Model.prototype.GetClosetTimezoneLabel = function(){
            return this.timezone_label;
        }
        Model.prototype.IsMatchLabel = function(label){
            var arr = R.filter(function (n){
                return label === n;
            })(this.timezone_list);
            return (arr.length !== 0);
        }


        /*Setter Getter */
        Model.prototype.GetCurrentTimezoneLabel = function(){
            return this.timezone_label;
        }
        Model.prototype.SetMyTimezoneLabel = function(string){
            this.ProcessTimezoneLabel(string);
        }
        Model.prototype.LoadPreferenceTimezoneOffset = function(){
            var tz_label  = this.RetrievePreferenceLabel();
            if(tz_label){
                this.SetMyTimezoneLabel(tz_label);
            }else{
                this.SetMyTimezoneLabel(this.GetClosetTimezoneLabel());
            }
        }

        var time_zone_list = moment.tz.names();

        var factory = new Model(time_zone_list);
        return factory;
    }

})();
