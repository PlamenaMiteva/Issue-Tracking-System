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
                    $scope.isLead = false;
                    $scope.isAssignee = false;
                    if(JSON.parse(sessionStorage['currentUser']).userName=== issue.data.Author.Username){
                        $scope.isLead = true;
                    }
                    if(JSON.parse(sessionStorage['currentUser']).userName=== issue.data.Assignee.Username){
                        $scope.isAssignee = true;
                    }
                    console.log(issue.data);
                });


        }]);