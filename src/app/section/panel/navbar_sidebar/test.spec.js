(function(){
  'use strict';


  describe('Testing Menu App Directive',TestConditions1);


  function TestConditions1(){
    var Factory;
    var scope;
    var element;
    var backend
    beforeEach(module('Section/Panel/Navbar/Application/Directive', 'client/Template'));

    beforeEach(inject(function ($rootScope, $compile) {
      scope   = $rootScope;
      element = angular.element('<navbarapplicationpanel></navbarapplicationpanel>');
      element = $compile(element)(scope);
      scope.$digest();
     }));

    it('Should Exist and Initialize'                       , B0001);

    function B0001(){}
  }



})();