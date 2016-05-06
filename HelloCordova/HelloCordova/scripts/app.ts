
module app {
    export class Config {
        constructor($routeProvider: ng.route.IRouteProvider, $compileProvider: ng.ICompileProvider) {
            $routeProvider.when("/", {
                templateUrl: "weather.html",
                controller: "weatherCtrl as vm"
            }).otherwise({ redirectTo: '/' });
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
        }
    }
    Config.$inject = ['$routeProvider', '$compileProvider'];
    var mainApp = angular.module('MyApp', ['ngRoute']);
    mainApp.config(Config);
    
} 