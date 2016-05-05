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
            $scope.isLead = false;
            $scope.isAdmin = false;
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

            identity.getCurrentUser()
                .then(function (user) {
                    $scope.currentUserId = user.Id;
                    if (user.isAdmin) {
                        $scope.isAdmin = true;
                    }
                });

            project.getProjectById($routeParams.id)
                .then(function (project) {
                    $scope.project = project.data;                   
                    var currentUser = identity.requestUserProfile();
                    if ($scope.currentUserId === project.data.Lead.Id) {
                        $scope.isLead = true;
                    }
                });

            project.getProjectIssues($routeParams.id)
                .then(function (issues) {
                    $scope.issues = issues.data;                   
                });

            $scope.addFilter = function addFilter(filter) {
                var key = Object.keys(filter);
                if (key=='day') {
                    key = "DueDate.Day";                    
                }
                if (key == 'month') {
                    key = "DueDate.Month";
                }
                if (key == 'year') {
                    key = "DueDate.Year";
                }
                if (Object.keys(filter) == "statusName" || Object.keys(filter) == "priorityName" || Object.keys(filter) == "projectName" || Object.keys(filter) == "authorUsername" || Object.keys(filter) == "authorisAdmin" || Object.keys(filter) == "assigneeUsername" || Object.keys(filter) == "assigneeisAdmin" || Object.keys(filter) == "title" || Object.keys(filter) == "description" || Object.keys(filter) == "issueKey") {
                    $rootScope.result += key + '==' + filter[Object.keys(filter)] + '&&';
                } else {
                    $rootScope.result += key + filter[Object.keys(filter)] + '&&';
                }
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
                if (Object.keys(filter) == "statusName" || Object.keys(filter) == "priorityName" || Object.keys(filter) == "projectName" || Object.keys(filter) == "authorUsername" || Object.keys(filter) == "authorisAdmin" || Object.keys(filter) == "assigneeUsername" || Object.keys(filter) == "assigneeisAdmin" || Object.keys(filter) == "title" || Object.keys(filter) == "description" || Object.keys(filter) == "issueKey") {
                    $rootScope.result += key + '==' + filter[Object.keys(filter)] + '||';
                } else {
                    $rootScope.result += key + filter[Object.keys(filter)] + '||';
                }                
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
                if (Object.keys(filter) == "statusName" || Object.keys(filter) == "priorityName" || Object.keys(filter) == "projectName" || Object.keys(filter) == "authorUsername" || Object.keys(filter) == "authorisAdmin" || Object.keys(filter) == "assigneeUsername" || Object.keys(filter) == "assigneeisAdmin" || Object.keys(filter) == "title" || Object.keys(filter) == "description" || Object.keys(filter) == "issueKey") {
                    $rootScope.result += key + '==' + filter[Object.keys(filter)];
                } else {
                    $rootScope.result += key + filter[Object.keys(filter)];
                }
                console.log($rootScope.result);
            }; 

            $scope.getFilteredIssues = function getFilteredIssues() {
                issue.getFilteredIssues($scope.pageSize, $scope.pageNumber, $rootScope.result)
               .then(function (issues) {
                   console.log(issues.data);
                   $scope.totalPages = issues.data.TotalPages;
                   $scope.issues = issues.data.Issues;
                   $scope.pages = issues.data.TotalPages;
                   for (var i = 1; i <= $scope.pages; i++) {
                       $scope.pageArray.push(i);
                   }
               });
                console.log($rootScope.result);
            }
        }]);