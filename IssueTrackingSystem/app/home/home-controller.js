'use strict';

angular.module('issueTrackingSystem.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        });
    }])
    .controller('HomeCtrl', [
        '$scope',
        '$location',
        'authentication',
        'dashboard',
        function ($scope, $location, authentication, dashboard) {

            $scope.login = function (user) {
                authentication.loginUser(user)
                    .then(function (loggedInUser) {                        
                        $location.path('/dashboard');
                    });
            };

            $scope.register = function (user) {
                authentication.registerUser(user)
                    .then(function (registeredUser) {
                        $location.path('/dashboard');
                    });
            };
        }]);