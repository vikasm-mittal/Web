module app {
    export class Config {

        static IID: string = "MyApp";

        constructor($routeProvider: ng.route.IRouteProvider) {
            $routeProvider.when("", {
                templateUrl: "/app/posts/list.html",
                controller: "PostsCtrl as vm"
            }).when("/edit/:id", {
                templateUrl: "/app/posts/edit.html",
                controller: "PostEditCtrl as vm"
            }).when("/add", {
                templateUrl: "/app/posts/add.html",
                controller: "PostsAddCtrl as vm"
            }).otherwise({ redirectTo: '/' });
        }
    }
    Config.$inject = ['$routeProvider'];

    var mainApp = angular.module(Config.IID, ['ngRoute']);
    mainApp.config(Config);
}