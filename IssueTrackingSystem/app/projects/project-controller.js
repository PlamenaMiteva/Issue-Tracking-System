'use strict';

angular.module('issueTrackingSystem.projects', [
        'issueTrackingSystem.project'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/:id', {
            templateUrl: 'projects/project.html',
            controller: 'ProjectCtrl'
        })
    }])
    .controller('ProjectCtrl', [
        '$scope',
        '$routeParams',
        'project',
        function ($scope, $routeParams, project) {
            $scope.isLead = false;

            project.getProjectById($routeParams.id)
                .then(function (project) {
                    $scope.project = project.data;
                    if(JSON.parse(sessionStorage['currentUser']).userName=== project.data.Lead.Username){
                        $scope.isLead = true;
                    }
                });

            project.getProjectIssues($routeParams.id)
                .then(function (issues) {
                    $scope.issues = issues.data;                   
                });
        }]);