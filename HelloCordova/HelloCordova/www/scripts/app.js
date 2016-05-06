var app;
(function (app) {
    var Config = (function () {
        function Config($routeProvider, $compileProvider) {
            $routeProvider.when("/", {
                templateUrl: "weather.html",
                controller: "weatherCtrl as vm"
            }).otherwise({ redirectTo: '/' });
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
        }
        return Config;
    }());
    app.Config = Config;
    Config.$inject = ['$routeProvider', '$compileProvider'];
    var mainApp = angular.module('MyApp', ['ngRoute']);
    mainApp.config(Config);
})(app || (app = {}));
