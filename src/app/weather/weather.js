/**
 * Created by teisaacs on 5/30/14.
 *
 * NOTE: the routing, controller, service and directives could all be broken out into separate files.
 * However, they would all need to be loaded and would need an Angular module
 */
var app = angular.module('devworkshop.Weather', [
    'ngRoute',
    'devworkshop.DataModel',
    'devworkshop.MenuService',
    'devworkshop.WeatherService']);


app.run(function(Menu) {
    Menu.addMenuItem({title:'Weather', link:'/weather/home'});
});

/**
 * Setup the routing used in the module.
 */
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/weather/listView', {templateUrl: 'app/weather/listview.tpl.html'});
    $routeProvider.when('/weather/home', {templateUrl: 'app/weather/home.tpl.html'});
}]);


/**
 * Home page controller
 */
app.controller('HomeCtrl', function($scope, $location, WeatherService, Model) {

    $scope.searchCriteria = Model.searchCriteria;

    $scope.searchResults = Model.searchResults;

    $scope.selectedLocation = Model.selectedLocation;

    $scope.currentConditions = Model.currentConditions;

    $scope.apiError;

    /**
     * Finds matching locations by zip code or by name
     */
    $scope.locationSearch = function() {
        if ($scope.searchCriteria) {
            WeatherService.locationSearch($scope.searchCriteria).then(function(response) {
                if (response && response.data.RESULTS) {
                    $scope.searchResults = Model.searchResults = response.data.RESULTS;
                }
            });
        }

    }

    /**
     * Grabs current conditions for selected location
     *
     * @param location as provided by wundermap api
     */
    $scope.getCurrentConditions = function(location) {

        $scope.selectedLocation = Model.selectedLocation = location;

        WeatherService.getCurrentConditions(location).then(function(response) {
            //handle response

            if (response.data.current_observation) {
                //store the currentConditions
                $scope.currentConditions = Model.currentConditions = response.data.current_observation;
                return;
            }

            //error with response
            if (response.data.response.error) {
                console.log("ERROR " + response.data.response.error.description);
                $scope.apiError = response.data.response.error.description;
            }

        });
    }
});


/**
 * Setup the Controllers
 */
app.controller('ListViewCtrl', function($scope, WeatherService, Model) {

    $scope.tenDayforecast = Model.tenDayforecast;

    $scope.selectedLocation = Model.selectedLocation;

    WeatherService.getTenDayForecast($scope.selectedLocation)
        .then(function(response){
            if (response.data.forecast) {
                $scope.tenDayforecast = response.data.forecast.simpleforecast.forecastday;
                return;
            }

            //error with response
            if (response.data.response.error) {
                console.log("ERROR " + response.data.response.error.description);
            }
        });
});

app.directive("forecastRenderer", function() {
    return {
        restrict : "E",
        replace : true
    }
});