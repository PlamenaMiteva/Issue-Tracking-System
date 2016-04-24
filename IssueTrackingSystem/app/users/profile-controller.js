'use strict';

angular.module('issueTrackingSystem.profile', [
    'ngRoute',
    'ui.bootstrap',
    'issueTrackingSystem.common.modal',
    'issueTrackingSystem.users.usersService'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/profile/password', {
            templateUrl: 'users/profile.html',
            controller: 'ProfileCtrl'
        })
    }])
    .controller('ProfileCtrl', [
        '$scope',
        '$rootScope',
        '$location',
        '$uibModal',
        'usersService',
        function ($scope, $rootScope, $location, $uibModal, usersService) {
            
            $scope.changePassword = function (user) {
                usersService.changePassword(user)
                    .then(function () {
                        console.log("done")
                        var modalInstance = $uibModal.open({
                            templateUrl: 'change-password-notification.html',
                            scope: function() {
                                var scope = $rootScope.$new();
                                scope.message = 'Your password has been successfully changed';
                                return scope;
                            }(),
                            controller: "ModalInstanceCtrl"
                        });
                    });
                $location.path('#/');
            };            

        }]);
