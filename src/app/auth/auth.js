/**
 * Created by teisaacs on 5/30/14.
 */

//Define the module to add this logic to
var app = angular.module('devworkshop.Auth', ['ngRoute']);

/**
 * Setup the routes for this module
 */
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {templateUrl: 'app/auth/login.tpl.html', controller: 'LoginCtrl', controllerAs: 'ctrl'});
}]);


app.service('AuthService', function() {
    var data = {};

    //user Object
    data.UserVO = {};

    /**
     * Verifies the user is authenticated and redirects them to the login if not
     */
    data.isAuthenticated = function () {
        if (this.UserVO) {
            return this.UserVO.authenticated;
        } else {
            return false;
        }
    }

    //This message will be checked by the login controller
    data.loginMessage = '';

        //default redirect path
    data.redirectPath = '/home';

    return data;
})

/**
 * verify we have credentials for this  route change.
 *
 * If we are not authorized then send the user to the login and store the originalPath to return to after login.
 */
app.run(function($rootScope, AuthService, $location) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {

        //determine if we need login
        if (next.$$route && next.$$route.originalPath !== '/login' && next.$$route.originalPath !== '/home' && !AuthService.isAuthenticated()) {

            //verify the users token with the server
            //TODO

            //save where we are going so on success login we can navigate to the correct page
            AuthService.redirectPath = next.$$route.originalPath;

            //say something
            AuthService.loginMessage = "Authorized Users Only";

            //redirect
            $location.path('/login');

            event.preventDefault();

        }
    });
});


/**
 * Login controller
 */
app.controller('LoginCtrl', function($scope, AuthService, $location) {
    window.scope = $scope;

    //for controller as syntax
    this.title = "System Login";

    //login error default to message on the model, this is set by other places in the app
    $scope.errorMsg = AuthService.loginMessage;

    //form model, no need to declare UI is already setting these up.  Just showing so you see where they come from
    $scope.username = '';
    $scope.password = '';

    //login function
    $scope.authenticate = function() {
        //reset the error message
        $scope.errorMsg = "";

        //here is where we call a service to give us authentication
        if ($scope.username === "todd" && $scope.password === "tester") {
            AuthService.UserVO =
            {
                firstName : "Todd",
                lastName : "Isaacs",
                authenticated : true,
                token: 'tokenfromserver'
            };


            //redirect to main view
            $location.path(AuthService.redirectPath);
        } else {
            //set authentication failed state
            $scope.errorMsg = "Invalid Login Credentials"
        }
    }
});

