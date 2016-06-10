(function(){
  'use strict';

  describe('Testing Date Filter Factory', TestConditions1);
  
  function TestConditions1(){
      var Factory;
      var scope;
      var element;
      var cookies;
      
      beforeEach(module('Time/Timezone/Factory', 'ngCookies'));
  
      beforeEach(inject(function ($rootScope, TimeTimezoneFactory, $cookies) {
        Factory = TimeTimezoneFactory
        cookies = $cookies
        scope = $rootScope.$new();
      }));

      it('Should load preference (in this case load default)'     , V0001);
      it('Should load preference (in this case load from cookie)' , V0002);
      it('Should set timezone when called'                        , V0003);
      it('should return closeup with missing Label on list'       , V0004);

      function V0001(){
        cookies.remove('timezone_label');
        Factory.LoadPreferenceTimezoneOffset();
        var lb = Factory.timezone_label;
        expect(lb).toEqual('US/Central');
      }
      function V0002(){
        cookies.put('timezone_label', 'US/Pacific');
        Factory.LoadPreferenceTimezoneOffset();
        var lb = Factory.timezone_label;
        expect(lb).toEqual('US/Pacific');
      }
      function V0003(){
        Factory.SetMyTimezoneLabel('US/Pacific');
        var lb = Factory.timezone_label;
        expect(lb).toEqual('US/Pacific');
        Factory.LoadPreferenceTimezoneOffset();
            lb = Factory.timezone_label;
        expect(lb).toEqual('US/Pacific');
      }
      function V0004(){
        cookies.remove('timezone_label');
        Factory.LoadPreferenceTimezoneOffset();
        var lb = Factory.timezone_label;
        expect(lb).toEqual('US/Central');
      }
      
  }
})();