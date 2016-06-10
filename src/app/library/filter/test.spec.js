(function(){
  'use strict';

  describe('Testing Date Filter Factory', TestConditions1);
  
  function TestConditions1(){
      var Factory;
      var Factory2;
      var scope;
      var element;
      
      beforeEach(module('Filter/Date/Factory', 'Time/Timezone/Factory'));
  
      beforeEach(inject(function ($rootScope, FilterDateFactory, TimeTimezoneFactory) {
        Factory = FilterDateFactory
        Factory2 = TimeTimezoneFactory
        scope = $rootScope.$new();
      }));


      it('Should convert date with correct timezone offset'       , V0001);
      it('Should return data if null'                             , V0002);

      function V0001(){    
        Factory2.SetMyTimezoneLabel('UTC');
        var my = Factory.ConvertDateTZFormatB('2016-01-05T14:31:25.880Z');
        expect(my).toEqual('Jan 5, 2016, 2:31 pm');
      }
      function V0002(){    
        Factory2.SetMyTimezoneLabel('UTC');
        var my = Factory.ConvertDateTZFormatA(null);
        expect(my).toEqual(null);
            my = Factory.ConvertDateTZFormatB(null);
        expect(my).toEqual(null);
      }
  }
})();