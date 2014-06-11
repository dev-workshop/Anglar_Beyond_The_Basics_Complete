/**
 * Created by teisaacs on 6/2/14.
 */
angular.module('devworkshop.MenuService', ['devworkshop.DataModel', 'devworkshop.Auth'])

/**
 * Menu data
 */
.factory('Menu', function($http){
    var menuService = {};
    var _menus = [];

    menuService.getMenus = function() {
        return _menus;
    }

    menuService.addMenuItem = function(menuItem) {
        _menus.push(menuItem);
    }

    return menuService;

})

/**
 * Menu controller used by the index page to control menus
 */
.controller('MenuCtrl', function($scope, Menu, $location, AuthService) {
    console.log("MenuCtrl");

    $scope.menus = Menu.getMenus();

    $scope.getClass = function(path) {
        if ($location.path().substr(0, path.length) == path) {
            return "active";
        } else {
            return "";
        }
    }

    $scope.logout = function() {
        AuthService.UserVO = undefined;
    }
});