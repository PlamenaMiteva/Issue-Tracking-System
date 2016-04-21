'use strict';

angular.module('issueTrackingSystem.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        });
    }])
    .controller('HomeCtrl', [
        '$rootScope',
        '$scope',
        '$location',
        'authentication',       
        function ($rootScope, $scope, $location, authentication) {
            $rootScope.auth = false;
            
            $scope.login = function (user) {
                authentication.loginUser(user)
                    .then(function (loggedInUser) {
                        $rootScope.auth = true;
                    });
            };

            $scope.register = function (user) {
                authentication.registerUser(user)
                    .then(function (registeredUser) {
                        $rootScope.auth = true;
                    });
            };            
        }]);