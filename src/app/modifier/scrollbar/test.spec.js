(function(){
  'use strict';


  describe('Testing Perfect Scrollbar Directive',TestConditions1);


  function TestConditions1(){
    var Factory;
    var scope;
    var element;
    var backend
    beforeEach(module('ScrollBar/Modifier/Directive', 'client/Template'));

    beforeEach(inject(function ($rootScope, $compile) {
      scope   = $rootScope;
      element = angular.element('<div perfectscrollbarmodifier></div>');
      element = $compile(element)(scope);
      scope.$digest();
     }));

    it('Should Exist and Initialize'                       , B0001);

    function B0001(){}
  }



})();