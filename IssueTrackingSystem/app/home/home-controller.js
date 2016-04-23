'use strict';

angular.module('issueTrackingSystem.home', ['ngRoute', 'ui.bootstrap', 'issueTrackingSystem.common.modal'])

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
        '$uibModal',
        'authentication',       
        function ($rootScope, $scope, $location, $uibModal, authentication) {
            $rootScope.auth = false;

            $scope.login = function (user) {                
                authentication.loginUser(user)
                    .then(function (loggedInUser) {                        
                        var modalInstance = $uibModal.open({
                            templateUrl: 'login-notification.html',
                            scope: function() {
                                var scope = $rootScope.$new();
                                scope.message = 'You have been successfully logged in';
                                return scope;
                            }(),
                            controller: "ModalInstanceCtrl" 
                        });  

                        $rootScope.auth = true;
                        
                    });
            };

            $scope.register = function (user) {
                authentication.registerUser(user)
                    .then(function (registeredUser) {
                        var modalInstance = $uibModal.open({
                            templateUrl: 'login-notification.html',
                            scope: function() {
                                var scope = $rootScope.$new();
                                scope.message = 'You have been successfully registered to the Issue Tracking System';
                                return scope;
                            }(),
                            controller: "ModalInstanceCtrl"
                        });
                        $rootScope.auth = true;
                    });
            };

            $scope.logout = function () {
                authentication.logout();

                var modalInstance = $uibModal.open({
                    templateUrl: 'login-notification.html',
                    scope: function() {
                        var scope = $rootScope.$new();
                        scope.message = 'You have been successfully logged out';
                        return scope;
                    }(),
                    controller: 'ModalInstanceCtrl'
                });

                $rootScope.auth = false;
                $location.path('#/');
            };
        }]);