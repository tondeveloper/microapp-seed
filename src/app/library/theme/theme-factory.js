(function(){
    'use strict';

    angular.module('Theme/Application/Factory', ['ngCookies', 'Global/Jquery/Factory'])
           .factory('ThemeApplicationFactory', Factory)

    /* @ngInject */
    function Factory($cookies, jquery){

        var Model = function(params){
            this.myTheme = 'dark';
            this.list  = {
                'dark' :jquery("link[href*='dark']"),
                'light':jquery("link[href*='light']")
            };
        }
        Model.prototype.SetMyTheme = function(theme){
            if(theme === 'light'){
                this.ProcessTheme('light', 'dark');
            }else{
                this.ProcessTheme('dark', 'light');
            }
        }
        Model.prototype.SwapTheme = function(theme, last_theme){
            var node = this.list[theme].detach();
                node.insertAfter(this.list[last_theme]);
        }
        Model.prototype.StorePreference = function(name){
            $cookies.put('theme', name);
        }
        Model.prototype.RetrievePreference = function(){
            return $cookies.get('theme');
        }
        Model.prototype.SetCurrentTheme = function(name){
            this.myTheme = name;
        }

        Model.prototype.ProcessTheme = function(theme, last_theme){
            this.SwapTheme(theme, last_theme);
            this.SetCurrentTheme(theme);
            this.StorePreference(theme);
        }

        Model.prototype.SwitchMyTheme = function(){
            if(this.myTheme === 'dark'){
                this.ProcessTheme('light', 'dark');
            }else{
                this.ProcessTheme('dark', 'light');
            }
        }
        Model.prototype.LoadPreferenceTheme = function(){
            var theme = this.RetrievePreference();
            if(theme){
                this.SetMyTheme(theme);
            }else{
                this.SetMyTheme(this.myTheme)
            }
        }

        //Instantiate this class as a singleton
        var factory = new Model();

        return factory;
    }
    

})();
