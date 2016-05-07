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
        'identity',
        function ($scope, $routeParams, issue, identity) {
            issue.getIssueById($routeParams.id)
                .then(function (issue) {
                    $scope.issue = issue.data;
                    identity.getCurrentUser()
                        .then(function (user) {
                            if (user.Id === issue.data.Author.Id) {
                                $scope.isLead = true;
                            }
                            if (user.Id === issue.data.Assignee.Id) {
                                $scope.isAssignee = true;
                            }
                        });
                });
        }]);