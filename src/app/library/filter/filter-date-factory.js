
(function(){
    'use strict';

    angular.module('Filter/Date/Factory', ['Global/Ramda/Factory', 'Global/Moment/Factory', 'Time/Timezone/Factory'])
        .factory('FilterDateFactory', Factory)

    /* @ngInject */
    function Factory(R, moment, TimeTimezoneFactory) {  

        function Model(){
            this.timezoneManager = TimeTimezoneFactory;
        }
        Model.prototype.ConvertDateTZFormatA = function(date){
            if(R.isNil(date)){ return date; } 
            var convert = moment.utc(date).tz(this.timezoneManager.timezone_label);
            var format  = 'MMM D, YYYY';
            return convert.format(format);
        }
        Model.prototype.ConvertDateTZFormatB = function(date){
            if(R.isNil(date)){ return date; } 
            var format  = 'MMM D, YYYY, h:mm a';
            var convert = moment.utc(date).tz(this.timezoneManager.timezone_label);
            return convert.format(format);
        }
        Model.prototype.ConvertDateTZFormatC = function(date){
            if(R.isNil(date)){ return date; } 
            var format  = 'MMM D, h:mm a';
            var convert = moment.utc(date).tz(this.timezoneManager.timezone_label);
            return convert.format(format);
        }
        Model.prototype.GetTodayDate = function(){
            var convert = moment.utc().tz(this.timezoneManager.timezone_label);
            var format  = 'dddd, MMMM D, YYYY';
            return convert.format(format);
        }
        Model.prototype.GetTodayFullDate = function(){
            var convert = moment.utc().tz(this.timezoneManager.timezone_label);
            var format  = 'dddd, MMMM D, YYYY, h:mm A';
            return convert.format(format);
        }

        var factory = new Model();
        return factory;
    }

})();
