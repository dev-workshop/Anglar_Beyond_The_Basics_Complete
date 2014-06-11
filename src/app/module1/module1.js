/**
 * Created by teisaacs on 5/29/14.
 */

var app = angular.module('devworkshop.Module1', ['ngRoute', 'devworkshop.MenuService', 'devworkshop.DataModel']);

app.run(function(Menu) {
    Menu.addMenuItem({title:'Module1', link:'/module1'});
});

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/module1', {templateUrl: 'app/module1/module1.tpl.html', controller: 'Module1Ctrl'} );
}]);


app.controller('Module1Ctrl', function($scope, Model) {
    $scope.showMsg = function() {
        Model.myFunction();
    }
});

