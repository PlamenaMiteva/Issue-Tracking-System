'use strict';

angular.module('issueTrackingSystem.issues', [
        'issueTrackingSystem.issue'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issues/:id', {
            templateUrl: 'issues/issue.html',
            controller: 'IssueCtrl'
        })
    }])
    .controller('IssueCtrl', [
        '$scope',
        '$routeParams',
        'issue',
        function ($scope, $routeParams, issue) {
            issue.getIssueById($routeParams.id)
                .then(function (issue) {
                    $scope.issue = issue.data;                   
                });           

        }]);