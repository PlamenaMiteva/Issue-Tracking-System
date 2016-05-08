'use strict';

angular.module('issueTrackingSystem.projects', [
        'issueTrackingSystem.project', 'ngAnimate', 'ui.bootstrap'
])
    .controller('ProjectCtrl', [
        '$scope',
        '$rootScope',
        '$routeParams',
        'identity',
        'authentication',
        'project',
        'issue',
        function ($scope, $rootScope, $routeParams, identity, authentication, project, issue) {
            $scope.pageNumber = 1;
            $scope.pageSize = 10;
            $scope.start = 0;
            $scope.end = 10;
            $scope.pageArray = [];
            $rootScope.result='';

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
                .then(function (result) {
                    $scope.result = result.data;
                    $scope.issues = $scope.result.slice($scope.start, $scope.end);
                    $scope.totalPages = Math.ceil($scope.result.length / $scope.pageSize);
                    for (var i = 1; i <= $scope.totalPages; i++) {
                        $scope.pageArray.push(i);
                    }
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
               .then(function (response) {
                   $scope.totalPages = response.data.TotalPages;
                   issue.getFilteredIssues($scope.pageSize*$scope.totalPages, $scope.pageNumber,  $rootScope.result)
                       .then(function (result) {
                           $scope.result = result.data.Issues;
                           $scope.issues = $scope.result.slice($scope.start, $scope.end);
                           $scope.pageArray=[];
                           for (var i = 1; i <= $scope.totalPages; i++) {
                               $scope.pageArray.push(i);
                           }
                       });
               });
            }

            $scope.nextPage = function () {
                if ($scope.pageNumber < $scope.totalPages) {
                    $scope.pageNumber++;
                    $scope.start += $scope.pageSize;
                    $scope.end += $scope.pageSize;
                    $scope.issues = $scope.result.slice($scope.start, $scope.end);
                }
            };

            $scope.getCurrentPage = function (page) {
                $scope.pageNumber = page;
                $scope.start = ((page - 1) * $scope.pageSize);
                $scope.end = page * $scope.pageSize;
                $scope.issues = $scope.result.slice($scope.start, $scope.end);
            };

            $scope.previousPage = function () {
                if ($scope.pageNumber > 1) {
                    $scope.pageNumber--;
                    $scope.start -= $scope.pageSize;
                    $scope.end -= $scope.pageSize;
                    $scope.issues = $scope.result.slice($scope.start, $scope.end);
                }
            };
        }]);