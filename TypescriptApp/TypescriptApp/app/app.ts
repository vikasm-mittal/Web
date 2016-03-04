module app {
    export class Config {

        static IID: string = "MyApp";

        constructor($routeProvider: ng.route.IRouteProvider) {
            $routeProvider.when("/", {
                templateUrl: "/app/posts/views/list.html",
                controller: "PostCtrl as vm"
            }).when("/edit/:id", {
                templateUrl: "/app/posts/views/edit.html",
                controller: "PostEditCtrl as vm"
            }).when("/add", {
                templateUrl: "/app/posts/add.html",
                controller: "PostAddCtrl as vm"
            }).otherwise({ redirectTo: '/' });
        }
    }
    Config.$inject = ['$routeProvider'];

    var mainApp = angular.module('MyApp', ['ngRoute']);
    mainApp.config(Config);
}