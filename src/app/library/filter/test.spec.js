(function(){
  'use strict';

  describe('Testing Date Filter Factory', TestConditions1);
  
  function TestConditions1(){
      var Factory;
      var scope;
      var element;
      var cookies;
      
      beforeEach(module('Filter/Date/Factory', 'ngCookies'));
  
      beforeEach(inject(function ($rootScope, FilterDateFactory, $cookies) {
        Factory = FilterDateFactory
        cookies = $cookies
        scope = $rootScope.$new();
      }));

      it('Should load preference (in this case load default)'     , V0001);
      it('Should load preference (in this case load from cookie)' , V0002);
      it('Should set timezone when called'                        , V0003);
      it('Should parse string number to int number'               , V0004);
      it('Should convert date with correct timezone offset'       , V0005);
      it('Should return data if null'                             , V0006);

      function V0001(){
        Factory.LoadPreferenceTimezoneOffset();
        var my = Factory.timezone_offset;
        expect(my).toEqual(-6);
      }
      function V0002(){
        cookies.put('timezone_offset', -8);
        Factory.LoadPreferenceTimezoneOffset();
        var my = Factory.timezone_offset;
        expect(my).toEqual(-8);
      }
      function V0003(){
        Factory.SetMyTimezone(-7);
        var my = Factory.timezone_offset;
        expect(my).toEqual(-7);
        Factory.LoadPreferenceTimezoneOffset();
            my = Factory.timezone_offset;
        expect(my).toEqual(-7);
      }
      function V0004(){    
        Factory.SetMyTimezone(-6);
        var my = Factory.ConvertDateTZFormatA('2016-01-05T22:31:25.880Z');
        expect(my).toEqual('Jan 5, 2016');
      }
      function V0005(){    
        Factory.SetMyTimezone(-7);
        var my = Factory.ConvertDateTZFormatB('2016-01-05T22:31:25.880Z');
        expect(my).toEqual('Jan 5, 2016 3:31 pm');
      }
      function V0006(){    
        Factory.SetMyTimezone(-7);
        var my = Factory.ConvertDateTZFormatA(null);
        expect(my).toEqual(undefined);
            my = Factory.ConvertDateTZFormatB(null);
        expect(my).toEqual(undefined);
      }
      
  }
})();