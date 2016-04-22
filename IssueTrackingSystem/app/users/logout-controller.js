'use strict';

angular.module('issueTrackingSystem.users.logout', [
        'ui.bootstrap', 'issueTrackingSystem.users.authentication', 'issueTrackingSystem.common.modal'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/logout', {
            templateUrl: '',
            controller: 'LogoutCtrl'
        })
    }])
    .controller('LogoutCtrl', [
        '$scope',
        '$rootScope',
        '$location',
        '$uibModal',
        '$routeParams',
        'authentication',
        function ($scope, $rootScope, $location, $uibModal, $routeParams, authentication) {
            $scope.animationsEnabled = true;

            $scope.logout = function () {
                authentication.logout();               

                var modalInstance = $uibModal.open({
                    templateUrl: 'logout-notification.html',
                    scope: $scope,
                    controller: 'ModalInstanceCtrl'                    
                });

                $rootScope.auth = false;
                $location.path('#/');
            };

            $scope.toggleAnimation = function () {
                $scope.animationsEnabled = !$scope.animationsEnabled;
            };
        }]);



