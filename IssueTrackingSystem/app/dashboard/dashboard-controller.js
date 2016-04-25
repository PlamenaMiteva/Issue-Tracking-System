'use strict';

angular.module('issueTrackingSystem.board', [
        'issueTrackingSystem.dashboard'
])    
    .controller('BoardCtrl', [
        '$scope',
        '$location',
        'authentication',
        'identity',
        'dashboard',
        function ($scope, $location, authentication, identity, dashboard) {

            if (!authentication.isAuthenticated()) {
                $location.path('/');
            }
            $scope.pageNumber= 1;
            $scope.pageSize = 10;
            $scope.pageArray = [];
            $scope.projectPageNumber = 1;
            $scope.projectPageSize = 10;
            $scope.projectPageArray = [];
            $scope.start = 0;
            $scope.end = 10;

            identity.getCurrentUser()
                .then(function (user) {
                    $scope.currentUserId = user.Id;
                });
           
            dashboard.showUserDashboard($scope.pageSize, $scope.pageNumber)
               .then(function (issues) {
                   $scope.totalPages = issues.data.TotalPages;
                   $scope.issues = issues.data.Issues;
                   $scope.pages = issues.data.TotalPages;
                   for (var i = 1; i <= $scope.pages; i++) {
                       $scope.pageArray.push(i);
                   }                   
               });

            dashboard.getAllProjects()
                .then(function (projects) {
                    $scope.myProjects = projects.data.filter(function (x) {
                        return x.Lead.Id == $scope.currentUserId;
                    });
                    
                    dashboard.showUserDashboard($scope.totalPages*10, 1)
                        .then(function (result) {
                            $scope.allIssues = result.data.Issues;
                            $scope.allIssues.forEach(function(i){
                                if ($scope.myProjects.indexOf(i.Project) == -1) {
                                    $scope.myProjects.push(i.Project);                                    
                                };
                            });
                            $scope.projects = $scope.myProjects.slice($scope.start, $scope.end);
                            $scope.projectsPages = Math.ceil($scope.myProjects.length / 10);
                            for (var i = 1; i <= $scope.projectsPages; i++) {
                                $scope.projectPageArray.push(i);
                            }
                        });
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

            $scope.projectNextPage = function () {
                if ($scope.projectPageNumber < $scope.projectsPages) {
                    $scope.projectPageNumber++;
                    $scope.start += 10;
                    $scope.end += 10;
                    $scope.projects = $scope.myProjects.slice($scope.start, $scope.end);
                }
            };

            $scope.getCurrentProjectPage = function (page) {
                $scope.projectPageNumber = page;
                $scope.start = ((page-1) * 10);
                $scope.end = page * 10;
                $scope.projects = $scope.myProjects.slice($scope.start, $scope.end);
                console.log($scope.projects);
            };

            $scope.projectPreviousPage = function () {
                if ($scope.projectPageNumber > 1) {
                    $scope.projectPageNumber--;
                    $scope.start -= 10;
                    $scope.end -= 10;
                    $scope.projects = $scope.myProjects.slice($scope.start, $scope.end);                  
                }
            };
        }]); 