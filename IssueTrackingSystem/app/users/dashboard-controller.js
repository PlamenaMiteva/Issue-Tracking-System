'use strict';

angular.module('issueTrackingSystem.users.board', [
        'issueTrackingSystem.users.dashboard'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'users/dashboard.html',
            controller: 'BoardCtrl'
        });
    }])
    .controller('BoardCtrl', [
        '$scope',
        '$location',
        'dashboard',
        function ($scope, $location, dashboard) {

            $scope.pageNumber= 1;
            $scope.pageSize = 10;
            $scope.pageArray = [];            
           
            dashboard.showUserDashboard($scope.pageSize, $scope.pageNumber)
               .then(function (issues) {
                   $scope.issues = issues.data.Issues;
                   $scope.pages = issues.data.TotalPages;
                   for (var i = 1; i <= $scope.pages; i++) {
                       $scope.pageArray.push(i);
                   }                   
               });

            $scope.nextPage = function () {
                if ($scope.pageNumber < $scope.pages) {
                    $scope.pageNumber++;
                    dashboard.showUserDashboard($scope.pageSize, $scope.pageNumber)
                    .then(function (issues) {
                        $scope.issues = issues.data.Issues;
                        $scope.pages = issues.data.TotalPages;
                    });
                }
            };

            $scope.getCurrentPage = function (page) {                   
                    dashboard.showUserDashboard($scope.pageSize, page)
                    .then(function (issues) {
                        console.log(page)
                        $scope.issues = issues.data.Issues;
                        $scope.pages = issues.data.TotalPages;
                    });                
            };

            $scope.previousPage = function () {
                if ($scope.pageNumber > 1) {
                    $scope.pageNumber--;
                    dashboard.showUserDashboard($scope.pageSize, $scope.pageNumber)
                    .then(function (issues) {
                        $scope.issues = issues.data.Issues;
                        $scope.pages = issues.data.TotalPages;
                    });
                }
            };
        }]);