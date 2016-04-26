'use strict';

angular.module('issueTrackingSystem.addProject', [
        'issueTrackingSystem.project'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/add',
            {
            templateUrl: 'projects/add-project.html',
            controller: 'AddProjectCtrl'
        })
    }])
    .controller('AddProjectCtrl', [
        '$scope',        
        '$location',
        '$routeParams',
        'identity',
        'issue',
        'project',
        'usersService',
        'label',        
        function ($scope, $location, $routeParams, identity, issue, project, usersService, label) {
            $scope.project = {};
            $scope.project.Labels = [];
            $scope.project.Priorities = [];

            usersService.getAllUsers()
               .then(function (response) {
                 $scope.users = response.data;
            });

            $scope.getAllLabels = function (val) {               
                console.log(val);
                return label.getLabels(val);
            }


            $scope.addLabel = function addLabel(labels, newLabelName) {
                var newLabel = {
                    "Name": newLabelName
                };

                $scope.project.Labels.push(newLabel);
            }

            $scope.addPriority = function addPriority(priorityName) {
                var newPriority = {
                    "Name": priorityName
                };

                $scope.project.Priorities.push(newPriority);
            }

            $scope.checkKey = function (key) {
                var abbr = $scope.project.Name.split(' ').map(function (item) { return item[0] }).join('');
                
                if (key == abbr) {
                    $scope.IsMatch = true;
                    return false;
                }
                $scope.IsMatch = false;                
            }

            $scope.addProject = function addProject(input) {
                input.Labels = $scope.project.Labels;
                input.Priorities = $scope.project.Priorities;
                project.addProject(input)
                    .then(function (result) {
                        $location.path('/projects');
                    });
            };

        }]);