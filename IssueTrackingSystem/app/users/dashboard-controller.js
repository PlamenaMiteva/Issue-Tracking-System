'use strict';

angular.module('issueTrackingSystem.users.board', [
        'issueTrackingSystem.users.dashboard'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'users/dashboard.html',
            controller: 'BoardCtrl'
        })
    }])
    .controller('BoardCtrl', [
        '$scope',
        'dashboard',
        function ($scope, dashboard) {
            dashboard.showUserDashboard().then(function (issues) {
                $scope.issues = issues.data.Issues;                
            });
        }]);