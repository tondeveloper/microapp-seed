(function() {
  'use strict';

    angular.module('Root/RunBlock/Run',['Theme/Application/Factory', 'Time/Timezone/Factory'])
           .run(RunBlock);

        /* @ngInject */
        function RunBlock($rootScope, $log, $timeout, ThemeApplicationFactory, TimeTimezoneFactory) {


            /*Load all customizable component preference stored by cookie*/
 
            TimeTimezoneFactory.LoadPreferenceTimezoneOffset();

            /*THIS EVENT IS TRIGGER WHEN A ROUTE IS INITIATE A CHANGED*/
            //$rootScope.$on('$stateChangeStart', function (event, toState,toParams, fromState, fromParams, error) {
            //});

            /*THIS EVENT IS TRIGGER WHEN A ROUTE RESULT IN ERROR*/
            //$rootScope.$on('$stateChangeError', function (event, toState,toParams, fromState, fromParams, error) {
            //    $log.debug('Error in Changing Routes or State was not resolve or failed');
            //    console.log(toState,toParams,fromState, fromParams, error)
            //});

            /*THIS EVENT IS TRIGGER WHEN A ROUTE IS NOT FOUND*/
            //$rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams){
            //});
        

            /*THIS EVENT IS TRIGGER WHEN A ROUTE CHANGE IS SUCCESS*/
            //$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams){
            //});

            /*THIS EVENT IS TRIGGER WHEN A VIEW IS BEING LOADED - BEFORE DOM IS RENDER*/
            //$rootScope.$on('$viewContentLoading', function (event, viewConfig){
            //});

            /*THIS EVENT IS TRIGGER WHEN A VIEW LOAD COMPLETE - AFTER DOM IS RENDER*/
            //$rootScope.$on('$viewContentLoaded', function (event){
            //});
        }
})();
