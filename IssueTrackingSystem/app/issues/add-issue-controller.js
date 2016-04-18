'use strict';

angular.module('issueTrackingSystem.add-issue', [
        'issueTrackingSystem.issue'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/:id/add-issue', {
            templateUrl: 'issues/add-issue.html',
            controller: 'AddIssueCtrl'
        })
    }])
    .controller('AddIssueCtrl', [
        '$scope',
        '$location',
        '$routeParams',
        'authentication',
        'issue',
        'project',
        'usersService',
        function ($scope, $location, $routeParams, authentication, issue, project, usersService) {
            $scope.isLead = false;            

            project.getProjectById($routeParams.id)
                .then(function (project) {
                    $scope.project = project.data;
                    
                    authentication.getCurrentUser().then(function (response) {                                              
                        if (response.Username == project.data.Lead.Username) {
                            $scope.isLead = true;
                        }
                    });                    
                   
                    usersService.getAllUsers()
                        .then(function (response) {
                            $scope.users = response.data;
                        });
                });

            $scope.addLabel = function addLabel(labels, newLabelName) {
                var newLabel = {
                    "Name": newLabelName
                };

                labels.push(newLabel);               
                console.log($scope.project.Labels);
            }

            $scope.addIssue = function addIssue (projectId, input) {
                input.ProjectId = projectId;
                input.Labels = $scope.project.Labels;
                console.log(input);
                issue.addIssue(projectId, input)
                    .then(function (result) {
                        $location.path('/issues/' + result.data.Id);
                    });
            };

        }]);