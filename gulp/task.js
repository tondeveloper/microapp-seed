'use strict';


/*
  serve process: These gulp task help stage file in .tmp for browser preview
  build process: run serve process + additional staging task then -> convert all stage files into build files

  stage files will not always mirror build files due to extra files being produce to help the build process

  notes
  all gulp task will require a gulp module, a run-sequence module, and configuration setting
  var run will always run task in sequeunce unless you add an array which will run in parallel.
*/
var TaskModule = function(settings){

    var gulp   = settings.gulp;
    var run    = settings.run;
    var config = settings.config;

    var CleanModule       = new require('./task/require/clean.js')(config);
    var StyleModule       = new require('./task/require/styles.js')(config);
    var ScriptModule      = new require('./task/require/scripts.js')(config);
    var ServerModule      = new require('./task/require/server.js')(config);
    var InjectModule      = new require('./task/require/inject.js')(config);
    var WatchModule       = new require('./task/require/watch.js')(config);
    var BuildModule       = new require('./task/require/build.js')(config);
    var CopyModule        = new require('./task/require/copy.js')(config);

    var UnitTestModule    = new require('./task/test/tests.js')(config);
    
    var BuildThemeModule  = new require('./task/theme/build-theme.js')(config);
    var InjectThemeModule = new require('./task/theme/inject-theme.js')(config);
    var CopyThemeModule   = new require('./task/theme/copy-theme.js')(config);

    /*MAIN COMMAND LINES*/

    /*Serve Files in .tmp folder for quick rendering. Does NOT do a full build - Any backend will not be hooked up*/
    gulp.task('serve', function (callback) {
      run('stage-temp', 'watch', 'server-start-serve', callback);
    });
    /*Serve Files in .tmp folder for quick rendering. Does NOT do a full build - Will hook to backend - see gulp/server.js for allow http*/
    gulp.task('serve:proxy', function (callback) {
      run('stage-temp', 'watch', 'server-start-proxy', callback);
    });
    /*Serve Files in build dist folder. CREATE a full build*/
    gulp.task('serve:build', function (callback) {
      run('stage-temp', 'stage-build', 'server-start-dist', callback);
    });
    /*Serve Files in build dist folder. CREATE a full build. RUN PROXY*/
    gulp.task('serve:build:proxy', function(callback){
       run('stage-temp', 'stage-build', 'server-start-dist-proxy', callback);
    });
    /*CREATE a full build to build dist folder*/
    gulp.task('build', function (callback){
      run('stage-temp', 'stage-build', callback);
    });

    //testing
    gulp.task('serve:proxy:nodemon', function (callback) {
      run('server-start-nodemon', 'stage-temp', 'watch', 'server-start-proxy', callback);
    });
    //FYI Unit test are still in alpha



    //gulp.task('serve:e2e', /*['inject'],*/ function (callback) {
    //  ServerModule.BrowserSyncInit([config.paths.tmp + '/serve', config.paths.src], []);
    //});
    //gulp.task('serve:e2e-dist', /*['build'],*/ function (callback) {
    //  ServerModule.BrowserSyncInit(config.paths.dist, []);
    //});




    /* 
        ALL TASK BELOW ARE NOT MENT TO BE RUN ON ITS OWN BUT SERVE AS HELPER & DEBUG PURSOSE ONLY
    */


    /*Quick Helper to run a series of task*/
    gulp.task('stage-temp', function (callback){
      run(['scripts-lint', 'clean-temp'], 'copy-index-temp', ['copy-theme-font-temp', 'copy-font-awesome-font-temp', 'build-styles'], 
          'inject-styles', 'inject-bower', 'inject-theme-script', 'inject-app-script', callback);
    });
    gulp.task('stage-build', function (callback){
      run('clean-dist', 'build-angular-template-partials', 'inject-angular-template-partials', 
          'build-dist-folder',['copy-images-dist','copy-favicon-dist', 'copy-font-dist'], callback);
    });




    /*Utility*/
    //reload browsersync stream by looking in src/asset and src/resource folder
    gulp.task('reload-style', function (callback) {
      run('build-styles', 'server-updatestream-style', callback);
    });
    gulp.task('reload-script', function (callback) {
      run('scripts-lint', 'inject-app-script', 'server-updatestream-script', callback)
    });

    /*SERVER*/
    gulp.task('server-start-serve', function (callback){
      return ServerModule.StartServerByServe(callback);
    });
    gulp.task('server-start-proxy', function (callback){
      return ServerModule.StartServerByProxy(callback);
    });
    gulp.task('server-start-dist', function (callback){
      return ServerModule.StartServerByDist(callback);
    });
    gulp.task('server-start-dist-proxy', function (callback){
      return ServerModule.StartServerByDistProxy(callback);
    });
    gulp.task('server-updatestream-script',function(){
      return ScriptModule.UpdateScriptsStreams();
    });
    gulp.task('server-updatestream-style',function(){
      return StyleModule.UpdateStylesStreams();
    });
    gulp.task('server-start-nodemon', function(callback){
      return ServerModule.StartNodemonServer(callback);
    })

    /*INJECTOR*/
    gulp.task('inject-styles', function (callback){
      run('inject-theme-light-styles','inject-theme-dark-styles', callback);
    });
    gulp.task('inject-theme-light-styles', function() {
      return InjectThemeModule.InjectThemeLightStyles();
    });
    gulp.task('inject-theme-dark-styles', function() {
      return InjectThemeModule.InjectThemeDarkStyles();
    });
    gulp.task('inject-theme-script', function() {
      return InjectThemeModule.InjectThemeScripts();
    });
    gulp.task('inject-bower', function(){
      return InjectModule.InjectBower();
    });
    gulp.task('inject-app-script', function(){
      return InjectModule.InjectAppScripts();
    });
    gulp.task('inject-angular-template-partials', function(){
      return InjectModule.InjectAngularTemplatePartials();
    });


    /*BUILDER*/

    //trigger style task such as compile theme styles. 
    gulp.task('build-styles', function (callback) {
      run(['build-theme-light-styles', 'build-theme-dark-styles'], callback);
    });
    //compile light theme and send to .tmp/serve/app/light-theme.css
    gulp.task('build-theme-light-styles', function() {
      return BuildThemeModule.BuildStylesLightTheme();
    });
    //compile dark theme and send to .tmp/serve/app/dark-theme.css
    gulp.task('build-theme-dark-styles', function() {
      return BuildThemeModule.BuildStylesDarkTheme();
    });
    //compile fontawesome and send to .tmp/serve/app/fontawesome.css
    gulp.task('build-fontawesome-styles', function() {
      return BuildThemeModule.BuildStylesDarkTheme();
    });
    gulp.task('build-angular-template-partials', function () {
      return BuildModule.BuildAngularTemplatePartials();
    });
    gulp.task('build-dist-folder', function(){
      return BuildModule.BuildDistFolder();
    });

    /*COPY*/
    gulp.task('copy-index-temp',function(){
      return CopyModule.CopyIndexHtmlSrcToTemp();
    });
    gulp.task('copy-images-dist', function(){
      return CopyModule.CopyImagesSrcToDist();
    });
    gulp.task('copy-favicon-dist', function(){
      return CopyModule.CopyFaviconSrcToDist();
    });
    gulp.task('copy-theme-font-temp',function(){
      return CopyThemeModule.CopyThemeFontsSrcToTemp();
    });
    gulp.task('copy-font-awesome-font-temp',function(){
      return CopyThemeModule.CopyThemeFontAwesomeSrcToTemp();
    });
    gulp.task('copy-font-dist', function(){
      return CopyModule.CopyFontTempToDist();
    });

    /*SCRIPT*/
    gulp.task('scripts-lint', function(){
      return ScriptModule.LintScripts();
    });
    gulp.task('scripts-lint-server', function(){
      return ScriptModule.LintServerScripts();
    });


    /*WATCHER*/
    gulp.task('watch', function (callback) {
      run('watch-style', 'watch-script', 'watch-html', callback);
    });
    gulp.task('watch-style', function(){
      return WatchModule.WatchStyle();
    });
    gulp.task('watch-script', function(){
      return WatchModule.WatchScript();
    });
    gulp.task('watch-html', function(){
      return WatchModule.WatchHtml();
    });


    /*Cleaner*/
    gulp.task('clean', function (callback) {
      run(['clean-dist','clean-temp'], callback)
    });
    gulp.task('clean-dist', function () {
      return CleanModule.CleanDistFolder();
    });
    gulp.task('clean-temp', function () {
      return CleanModule.CleanTempFolder();
    });


    /*Unit Test*/
    gulp.task('test', /*['scripts'],*/ function (callback) {
      run('scripts-lint', 'test-start', callback);
    });
    gulp.task('test:auto', /*['watch'],*/ function (callback) {
      run('scripts-lint', 'test-start-watch-mode', 'watch', callback);
    });
    gulp.task('test-start', function (callback){
      UnitTestModule.RunTests(true, callback);
    });
    gulp.task('test-start-watch-mode', function (callback) {
      UnitTestModule.RunTests(false, callback);
    });

};

module.exports = function(setting){
  return new TaskModule(setting)
};