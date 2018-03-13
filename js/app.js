/* global angular */
var app = angular.module("app", ["ngRoute"]);

	app.config(function($routeProvider) {
    $routeProvider
    .when("/", interceptor())
    .when("/app", interceptor())
    .when("/register",{
            templateUrl : "../register.html",
            controller : "RegisterController"
    });
});

function interceptor(){
    if(sessionStorage.getItem('email') && sessionStorage.getItem('senha')){
        return {
            templateUrl : "../templates/app.html",
            controller : "PlacesController"
        };
    }else{
        return {
            templateUrl : "../login.html",
    		controller : "LoginController"
        };
    }
}