/**
 * Created by teisaacs on 5/30/14.
 */
var app = angular.module('devworkshop.WeatherService', []);

app.factory('WeatherService', function($http){
    var API_KEY             = '';
    var AUTO_COMPLETE_URL   = 'http://www.corsproxy.com/autocomplete.wunderground.com/aq?query='
    var API_URL             = 'http://api.wunderground.com/api/';
    var OUTPUT_FORMAT       = '.json';
    var JSONP_CALLBACK      = 'callback=JSON_CALLBACK';

    var weatherService = {};

    /**
     * Searches for wundermap locations
     *
     * Returns Location Object:
     *      {
	 *  	    "name": "46167 - Pittsboro, IN",
	 *  	    "type": "city",
	 *  	    "c": "US",
	 *  	    "zmw": "46167.1.99999",
	 *  	    "tz": "America/Indianapolis",
	 *  	    "tzs": "EDT",
	 *  	    "l": "/q/zmw:46167.1.99999",
	 *  	    "ll": "39.876598 -86.471100",
	 *   	    "lat": "39.876598",
	 *  	    "lon": "-86.471100"
	 *      }
     *
     * @param searchStr         zip code, city, country, town, etc...
     * @returns {HttpPromise}   Array of Locations
     */
    weatherService.locationSearch = function(searchStr) {
        if (searchStr) {
            return $http.get(AUTO_COMPLETE_URL + searchStr);
        }
    }


    /**
     * Location from wundermap API autocomplete
     *
     * @param selectedLocation
     * @returns {HttpPromise}
     */
    weatherService.getTenDayForecast = function(selectedLocation) {
        if (selectedLocation) {
           return $http.jsonp(API_URL + API_KEY + 'forecast10day' +  selectedLocation.l + '.json?callback=JSON_CALLBACK');
        }
    }

    weatherService.getCurrentConditions = function(selectedLocation) {
        if (selectedLocation){
            return $http.jsonp(API_URL + API_KEY + "conditions" + selectedLocation.l + OUTPUT_FORMAT + '?' + JSONP_CALLBACK);
        }
    }

    return weatherService;
});