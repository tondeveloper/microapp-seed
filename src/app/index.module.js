(function() {
  'use strict';

  angular.module('AngularModules', [
    'ngAnimate', 
    'ngCookies', 
    'ngTouch', 
    'ngSanitize', 
    'ngMessages',
    'ngAria'
  ]);

  angular.module('ThirdPartyModules', [
    'ui.router',
  ]);

  angular.module('SecurityModules', [
    /*You can use 3rd party app such as stormpath*/
  ]);

  angular.module('GlobalModules', [
    'Global/Ramda/Factory',
    'Global/PerfectScrollBar/Factory',
    'Global/Jquery/Factory',
    'Global/Moment/Factory'
  ]);

  angular.module('RootModules', [
    'Root/Route/Const',
    'Root/Route/Config',
    'Root/RunBlock/Run',
    'Root/Setting/Config'
  ]);

  angular.module('SectionPages', [
    'SectionPagePublicComponents',
    'SectionPageErrorComponents',
    'SectionPageAppComponents'
  ]);
        angular.module('SectionPagePublicComponents',[
          'Section/Page/Public/Landing/Directive'
        ]);
        angular.module('SectionPageErrorComponents',[
          'Section/Page/Error/Forbidden/Directive',
          'Section/Page/Error/NotFound/Directive',
        ]);
        angular.module('SectionPageAppComponents', [
          'Section/Page/App/Interm/Directive',
          'SectionPageAppComponentsHome'
        ]);
              angular.module('SectionPageAppComponentsHome', [
                'Section/Page/Home/Interm/Directive',
                'Section/Page/Home/Dashboard/Factory',
                'Section/Page/Home/Dashboard/Directive',
              ]);


  angular.module('SectionPanels', [
    'Section/Root/Directive',
    'Section/Panel/Navbar/Application/Directive',
  ]); 

  angular.module('Components', [
    'TabComponents',
  ]);
        angular.module('TabComponents', [
          'Tab/Model/Factory',
          'Tab/Component/Directive'
        ]);

  angular.module('Library', [
    'Filter',
    'Http',
    'Theme'
  ]);
            angular.module('Filter', [
              'Filter/Date/Factory'
            ]); 
            angular.module('Http', [
               'Http/Api/JsonApiHateoas/Factory',
            ]); 
            angular.module('Theme', [
              'Theme/Application/Factory'
            ]);

      angular.module('Modifiers', [
        'ScrollBar/Modifier/Directive'
      ]);

  angular.module('MyModules', [
    'SectionPages',
    'SectionPanels',
    'Components',
    'Library',
    'Modifiers'
  ]);

  angular.module('client', ['AngularModules', 'ThirdPartyModules', 'SecurityModules', 'GlobalModules', 'RootModules', 'MyModules']);
})();
