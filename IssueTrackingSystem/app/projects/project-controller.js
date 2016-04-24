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
        'identity',
        'project',
        function ($scope, $routeParams, identity, project) {
            $scope.isLead = false;

            project.getProjectById($routeParams.id)
                .then(function (project) {
                    $scope.project = project.data;
                    var currentUser = identity.requestUserProfile();
                    if(currentUser.Id === project.data.Lead.Id){
                        $scope.isLead = true;
                    }
                });

            project.getProjectIssues($routeParams.id)
                .then(function (issues) {
                    $scope.issues = issues.data;                   
                });
        }]);