
(function(){
    'use strict';

    angular.module('Filter/Date/Factory', ['Global/Ramda/Factory', 'Global/Moment/Factory', 'ngCookies'])
        .factory('FilterDateFactory', Factory)

    /* @ngInject */
    function Factory(R, moment, $cookies) {  

        function Model(){
            this.timezone_offset = -6; //"America/Chicago";
        }
        Model.prototype.SetCurrentTimezoneOffset = function(number){
            this.timezone_offset = number;
        }
        Model.prototype.StorePreference = function(number){
            $cookies.put('timezone_offset', number);
        }
        Model.prototype.RetrievePreference = function(){
            return $cookies.get('timezone_offset');
        }
        Model.prototype.ProcessTimezone = function(number){
            this.SetCurrentTimezoneOffset(number);
            this.StorePreference(number);
        }
        Model.prototype.NormalizeNumber = function(stringnumber){
            return parseInt(stringnumber, 10);
        }
        /*Use Functions Below*/
        Model.prototype.ConvertDateTZFormatA = function(date){
            if(R.isNil(date)){ return; } 
            var convert = moment.utc(date).utcOffset(this.timezone_offset);
            var format  = 'MMM D, YYYY';
            return convert.format(format);
        }
        Model.prototype.ConvertDateTZFormatB = function(date){
            if(R.isNil(date)){ return; } 
            var convert = moment.utc(date).utcOffset(this.timezone_offset);
            var format  = 'MMM D, YYYY h:mm a';
            return convert.format(format);
        }
        Model.prototype.GetTodayDate = function(){
            var convert = moment.utc().utcOffset(this.timezone_offset);
            var format  = 'dddd, MMMM D, YYYY';
            return convert.format(format);
        }
        Model.prototype.GetTodayFullDate = function(){
            var convert = moment.utc().utcOffset(this.timezone_offset);
            var format  = 'dddd, MMMM D, YYYY, h:mm A';
            return convert.format(format);
        }
        Model.prototype.GetCurrentTimezone = function(){
            return this.timezone_offset;
        }
        Model.prototype.SetMyTimezone = function(number){
            this.ProcessTimezone(this.NormalizeNumber(number));
        }
        Model.prototype.LoadPreferenceTimezoneOffset = function(){
            var tz_offset = this.RetrievePreference();
            if(tz_offset){
                this.SetMyTimezone(tz_offset);
            }else{
                this.SetMyTimezone(this.timezone_offset);
            }
        }

        var factory = new Model();
        return factory;
    }

})();
