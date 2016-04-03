(function(){
  'use strict';

  describe('Testing Tab Factory', TestConditions1);
  describe('Testing Tab Directive',TestConditions2);


  
  function TestConditions1(){
      var Factory;
      var scope;
      var element;
      beforeEach(module('Tab/Model/Factory'));
  
      beforeEach(inject(function ($rootScope, TabModelFactory) {
        Factory = TabModelFactory;
        scope = $rootScope.$new();
      }));

      it('Should define Current Tab when provided a current tab param on init'                       , V0001);
      it('Should not define Current Tab when not provided a current tab param on init'               , V0002);
      it('Should define Current Tab when provided a current tab param on init even without tab array', V0003);
      it('Should define Current Tab when Set Function is called'                                     , V0004);

      function V0001(){
        var def = {'tab':['a', 'b', 'c'], 'current_tab':'b'}
        var mytab = Factory.CreateNewInstance(def);
        var current = mytab.IsCurrentTab('b')
        expect(current).toEqual(true);
      }
      function V0002(){
        var def = {'tab':['a', 'b', 'c']}
        var mytab = Factory.CreateNewInstance(def);
        var current = mytab.IsCurrentTab('b')
        expect(current).toEqual(false);
      }
      function V0003(){
        var def = {'current_tab':'b'}
        var mytab = Factory.CreateNewInstance(def);
        var current = mytab.IsCurrentTab('b')
        expect(current).toEqual(true);
      }
      function V0004(){
        var def = {'tab':['a', 'b', 'c'], 'current_tab':'b'}
        var mytab = Factory.CreateNewInstance(def);
        mytab.ChangeTabTo('c')
        var current = mytab.IsCurrentTab('c')
        expect(current).toEqual(true);
      }
  }

  

  

  function TestConditions2(){
    var Factory;
    var scope;
    var element;
    beforeEach(module('Tab/Component/Directive', 'client/Template'));

    beforeEach(inject(function ($rootScope, $compile) {
      scope   = $rootScope;
      element = angular.element('<TabComponentDirective></TabComponentDirective>');
      element = $compile(element)(scope);
      scope.$digest();
     }));

    it('Should Exist'                       , B0001);

    function B0001(){}
  }



})();