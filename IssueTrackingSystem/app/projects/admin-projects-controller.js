'use strict';

angular.module('issueTrackingSystem.adminProjects', [
        'issueTrackingSystem.project'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects', {
            templateUrl: 'projects/allProjects.html',
            controller: 'adminProjectsCtrl'
        })
    }])
    .controller('adminProjectsCtrl', [
        '$scope',
        '$routeParams',
        'identity',
        'dashboard',
        'project',
        function ($scope, $routeParams, identity, dashboard, project) {
            $scope.projectPageNumber = 1;
            $scope.projectPageSize = 10;
            $scope.projectPageArray = [];
            $scope.start = 0;
            $scope.end = 10;
           // $scope.isAdmin = false;

            //identity.getCurrentUser()
            //    .then(function (user) {                   
            //        if (user.isAdmin) {
            //            $scope.isAdmin = true;
            //        }
            //    });

            dashboard.getAllProjects()
                .then(function (projects) {
                    $scope.allProjects = projects.data;
                    $scope.projects = $scope.allProjects.slice($scope.start, $scope.end);
                    $scope.projectsPages = Math.ceil($scope.allProjects.length / 10);
                    for (var i = 1; i <= $scope.projectsPages; i++) {
                        $scope.projectPageArray.push(i);
                    }
                });

            $scope.projectNextPage = function () {                
                if ($scope.projectPageNumber < $scope.projectsPages) {
                    $scope.projectPageNumber++;
                    $scope.start += 10;
                    $scope.end += 10;
                    $scope.projects = $scope.allProjects.slice($scope.start, $scope.end);
                }
            };

            $scope.getCurrentProjectPage = function (page) {
                $scope.projectPageNumber = page;
                $scope.start = ((page - 1) * 10);
                $scope.end = page * 10;
                $scope.projects = $scope.allProjects.slice($scope.start, $scope.end);                
            };

            $scope.projectPreviousPage = function () {
                console.log($scope.projectPageNumber);
                if ($scope.projectPageNumber > 1) {
                    $scope.projectPageNumber--;
                    $scope.start -= 10;
                    $scope.end -= 10;
                    $scope.projects = $scope.allProjects.slice($scope.start, $scope.end);
                    console.log($scope.projects);
                }
            };
           
        }]);