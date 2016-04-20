'use strict';

angular.module('issueTrackingSystem.edit-project', [
        'issueTrackingSystem.project'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/:id/edit', {
            templateUrl: 'projects/edit-project.html',
            controller: 'EditProjectCtrl'
        })
    }])
    .controller('EditProjectCtrl', [
        '$scope',
        '$location',
        '$routeParams',
        'project',
        'usersService',
        function ($scope, $location, $routeParams, project, usersService) {

            project.getProjectById($routeParams.id)
                .then(function (project) {
                    $scope.project = project.data;
                    usersService.getAllUsers()
                        .then(function (response) {
                            $scope.users = response.data;
                        });
                });

            $scope.editProject = function editProject(id, input, labels, priorities) {
                input.Labels = labels;
                input.Priorities = priorities;
                console.log(priorities);
                project.editProject(id, input)
                    .then(function (result) {
                        $location.path('/projects/' + id);
                    });
            };
            
        }]);