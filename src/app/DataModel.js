/**
 * Created by teisaacs on 5/30/14.
 */

var app = angular.module('devworkshop.DataModel', []);

/**
* Application Data Model for shared data across application
*/
app.factory('Model', function(){
    var appModel = {};

    appModel.myFunction = function() {
        alert("Hello Data Model");
    };

    return appModel;
});