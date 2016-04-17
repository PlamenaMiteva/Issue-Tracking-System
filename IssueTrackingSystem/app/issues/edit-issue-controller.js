'use strict';

angular.module('issueTrackingSystem.edit-issue', [
        'issueTrackingSystem.issue'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issues/:id/edit', {
            templateUrl: 'issues/edit-issue.html',
            controller: 'EditIssueCtrl'
        })
    }])
    .controller('EditIssueCtrl', [
        '$scope',
        '$location',
        '$routeParams',
        'issue',
        'project',
        'usersService',
        function ($scope, $location, $routeParams, issue, project, usersService) {
            issue.getIssueById($routeParams.id)
                .then(function (issue) {
                    $scope.issue = issue.data;                    
                    $scope.isLead = false;
                    $scope.isAssignee = false;

                    usersService.getAllUsers()
                        .then(function (response) {
                            $scope.users = response.data;
                        });

                    project.getProjectById(issue.data.Project.Id)
                        .then(function (response) {
                            $scope.avilablePriorities = response.data.Priorities;                          
                        });

                    if(JSON.parse(sessionStorage['currentUser']).userName=== issue.data.Author.Username){
                        $scope.isLead = true;
                    }
                    if(JSON.parse(sessionStorage['currentUser']).userName=== issue.data.Assignee.Username){
                        $scope.isAssignee = true;
                    }
                });

            $scope.changeStatus = function (issueId, status) {
                issue.changeStatus(issueId, status.Id)
                    .then(function (result) {
                        $scope.issue.Status.Name = status.Name;
                        $scope.issue.AvailableStatuses = result.data;
                    });
            };           

            $scope.editIssue = function editIssue (id, input, labels) {
                input.Labels = labels;
                issue.editIssue(id, input)
                    .then(function (result) {
                        $location.path('/issues/' + id);
                    });
            };

        }]);