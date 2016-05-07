'use strict';

angular.module('issueTrackingSystem.projects', [
        'issueTrackingSystem.project', 'ngAnimate', 'ui.bootstrap'
])
    .controller('ProjectCtrl', [
        '$scope',
        '$rootScope',
        '$routeParams',
        'identity',
        'project',
        'issue',
        function ($scope, $rootScope, $routeParams, identity, project, issue) {
            $scope.pageNumber = 1;
            $scope.pageSize = 10;
            $scope.pageArray = [];
            $rootScope.result='';            
            //$scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            $scope.groups = [
               {
                   title: 'Issue',
                   templateUrl: 'projects/partials/issue-filter.html'
               },
               {
                   title: 'Project',
                   templateUrl: 'projects/partials/project-filter.html'
               },
               {
                   title: 'Author',
                   templateUrl: 'projects/partials/author-filter.html'
               },
               {
                   title: 'Assignee',
                   templateUrl: 'projects/partials/assignee-filter.html'
               },
               {
                   title: 'Priority',
                   templateUrl: 'projects/partials/priority-filter.html'
               },
               {
                   title: 'Status',
                   templateUrl: 'projects/partials/status-filter.html'
               }
            ];           

            project.getProjectById($routeParams.id)
                .then(function (project) {
                    $scope.project = project.data;
                    identity.getCurrentUser()
                        .then(function (user) {
                            var currentUserId = user.Id;
                            if (currentUserId  === $scope.project.Lead.Id) {
                                $scope.isLead = true;
                            }
                        });
                });

            project.getProjectIssues($routeParams.id)
                .then(function (issues) {
                    $scope.issues = issues.data;                    
                });

            $scope.addFilter = function addFilter(filter) {
                var key = Object.keys(filter);
                if (key == 'day') {
                    key = "DueDate.Day";
                }
                if (key == 'month') {
                    key = "DueDate.Month";
                }
                if (key == 'year') {
                    key = "DueDate.Year";
                }
                if (key == 'projectName') {
                    key = "Project.Name";
                }
                if (key == 'priorityName') {
                    key = "Priority.Name";
                }
                if (key == 'statusName') {
                    key = "Status.Name";
                }
                if (key == 'authorUsername') {
                    key = "Author.Username";
                }
                if (key == 'authorisAdmin') {
                    key = "Author.isAdmin";
                }
                if (key == 'assigneeUsername') {
                    key = "Assignee.Username";
                }
                if (key == 'assigneeisAdmin') {
                    key = "Assignee.isAdmin";
                }

                if (Object.keys(filter) == "statusName" || Object.keys(filter) == "priorityName" || Object.keys(filter) == "projectName" || Object.keys(filter) == "authorUsername" || Object.keys(filter) == "assigneeUsername" || Object.keys(filter) == "title" || Object.keys(filter) == "description" || Object.keys(filter) == "issueKey") {
                    $rootScope.result += key + '=="' + filter[Object.keys(filter)] + '"&&';
                } else if (Object.keys(filter) == "authorisAdmin" || Object.keys(filter) == "assigneeisAdmin") {
                    $rootScope.result += key + '==' + filter[Object.keys(filter)] + '&&';
                }else {
                    $rootScope.result += key + filter[Object.keys(filter)] + '&&';
                }
                $scope.filter={};
                console.log($rootScope.result);
            };

            $scope.orFilter = function orFilter(filter) {
                var key = Object.keys(filter);
                if (key == 'day') {
                    key = "DueDate.Day";
                }
                if (key == 'month') {
                    key = "DueDate.Month";
                }
                if (key == 'year') {
                    key = "DueDate.Year";
                }
                if (key == 'projectName') {
                    key = "Project.Name";
                }
                if (key == 'priorityName') {
                    key = "Priority.Name";
                }
                if (key == 'statusName') {
                    key = "Status.Name";
                }
                if (key == 'authorUsername') {
                    key = "Author.Username";
                }
                if (key == 'authorisAdmin') {
                    key = "Author.isAdmin";
                }
                if (key == 'assigneeUsername') {
                    key = "Assignee.Username";
                }
                if (key == 'assigneeisAdmin') {
                    key = "Assignee.isAdmin";
                }
                if (Object.keys(filter) == "statusName" || Object.keys(filter) == "priorityName" || Object.keys(filter) == "projectName" || Object.keys(filter) == "authorUsername" || Object.keys(filter) == "assigneeUsername" || Object.keys(filter) == "title" || Object.keys(filter) == "description" || Object.keys(filter) == "issueKey") {
                    $rootScope.result += key + '=="' + filter[Object.keys(filter)] + '"||';
                } else if (Object.keys(filter) == "authorisAdmin" || Object.keys(filter) == "assigneeisAdmin") {
                    $rootScope.result += key + '==' + filter[Object.keys(filter)] + '||';
                } else {
                    $rootScope.result += key + filter[Object.keys(filter)] + '||';
                }
                $scope.filter={};
                console.log($rootScope.result);
            }; 

            $scope.finishFilter = function finishFilter(filter) {
                var key = Object.keys(filter);
                if (key == 'day') {
                    key = "DueDate.Day";
                }
                if (key == 'month') {
                    key = "DueDate.Month";
                }
                if (key == 'year') {
                    key = "DueDate.Year";
                }
                if (key == 'projectName') {
                    key = "Project.Name";
                }
                if (key == 'priorityName') {
                    key = "Priority.Name";
                }
                if (key == 'statusName') {
                    key = "Status.Name";
                }
                if (key == 'authorUsername') {
                    key = "Author.Username";
                }
                if (key == 'authorisAdmin') {
                    key = "Author.isAdmin";
                }
                if (key == 'assigneeUsername') {
                    key = "Assignee.Username";
                }
                if (key == 'assigneeisAdmin') {
                    key = "Assignee.isAdmin";
                }
                if (Object.keys(filter) == "statusName" || Object.keys(filter) == "priorityName" || Object.keys(filter) == "projectName" || Object.keys(filter) == "authorUsername" || Object.keys(filter) == "assigneeUsername" || Object.keys(filter) == "title" || Object.keys(filter) == "description" || Object.keys(filter) == "issueKey") {
                    $rootScope.result += key + '=="' + filter[Object.keys(filter)] +'"';
                } else if (Object.keys(filter) == "authorisAdmin" || Object.keys(filter) == "assigneeisAdmin") {
                    $rootScope.result += key + '==' + filter[Object.keys(filter)];
                }else {
                    $rootScope.result += key + filter[Object.keys(filter)];
                }
                $scope.filter={};
                console.log($rootScope.result);
            }; 

            $scope.getFilteredIssues = function getFilteredIssues() {
                issue.getFilteredIssues($scope.pageSize, $scope.pageNumber, $rootScope.result)
               .then(function (result) {
                   $scope.totalPages = result.data.TotalPages;
                   issue.getFilteredIssues($scope.pageSize*$scope.totalPages, 1,  $rootScope.result)
                       .then(function (issues) {
                           $scope.issues = issues.data.Issues;
                       });
               });
            }
        }]);