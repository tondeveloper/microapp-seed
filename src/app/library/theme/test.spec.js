(function(){
  'use strict';

  describe('Testing Theme Factory', TestConditions1);
  
  function TestConditions1(){
      var Factory;
      var scope;
      var element;
      beforeEach(module('Theme/Application/Factory'));
  
      beforeEach(inject(function ($rootScope, ThemeApplicationFactory) {
        Factory = ThemeApplicationFactory
        
        scope = $rootScope.$new();
      }));

      it('Should load preference '                         , V0001);
      it('Should switch theme '                            , V0002);
      it('Should set theme '                               , V0003);
      it('Should set theme and load preference correctly'  , V0004);

      function V0001(){
        Factory.LoadPreferenceTheme();
        var my = Factory.myTheme;
        expect(my).toEqual('dark');
      }
      function V0002(){
        Factory.SwitchMyTheme();
        var my = Factory.myTheme;
        expect(my).toEqual('light');
        Factory.SwitchMyTheme();
            my = Factory.myTheme;
        expect(my).toEqual('dark');
      }
      function V0003(){
        Factory.SetMyTheme('light');
        var my = Factory.myTheme;
        expect(my).toEqual('light');
      }
      function V0004(){
        Factory.SetMyTheme('light');
        Factory.LoadPreferenceTheme();
        var my = Factory.myTheme;
        expect(my).toEqual('light');
      }
  }
})();