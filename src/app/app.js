/**
 * Created by teisaacs on 5/29/14.
 */
var app = angular.module('devworkshop', [
    'ui.bootstrap',
    'ngRoute',
    'devworkshop.Auth',
    'devworkshop.DataModel',
    'devworkshop.MenuService',
    'devworkshop.Module1',
    'devworkshop.Weather']);

/**
 * Setup the default route
 */
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'app/home.tpl.html'});
    $routeProvider.otherwise({redirectTo: '/home'});
}]);
