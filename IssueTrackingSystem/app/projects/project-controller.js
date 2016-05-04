'use strict';

angular.module('issueTrackingSystem.projects', [
        'issueTrackingSystem.project'
])
    .controller('ProjectCtrl', [
        '$scope',
        '$routeParams',
        'identity',
        'project',
        function ($scope, $routeParams, identity, project) {
            $scope.isLead = false;
            $scope.isAdmin = false;
            $scope.filters = [];
            $scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];            

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
                $scope.filters.push(filter);
                console.log($scope.filters);
            };

            $scope.getFilteredIssues = function getFilteredIssues() {
                var result = '';
                for (var i = 0; i < $scope.filters.length; i++) {
                    result += $scope.filters[i].parametar;
                    if ($scope.filters[i].startMonth == $scope.filters[i].endMonth) {
                        result += '==' + $scope.filters[i].startMonth;
                    }
                    else if ($scope.filters[i].startMonth != undefined && $scope.filters[i].endMonth != undefined) {
                        result += '>=' + $scope.filters[i].startMonth + '&' + $scope.filters[i].parametar + '<=' + $scope.filters[i].endMonth;
                    }
                    else if ($scope.filters[i].startMonth != undefined) {
                        result += '>=' + $scope.filters[i].startMonth;
                    }
                    else if ($scope.filters[i].endMonth != undefined) {
                        result += '>=' + $scope.filters[i].endMonth;
                    }
                    if (i != $scope.filters.length-1) {
                        result += 'and';
                    }
                }
                console.log(result);
            }
        }]);