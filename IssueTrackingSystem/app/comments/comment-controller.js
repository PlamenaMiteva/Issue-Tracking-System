'use strict';

angular.module('issueTrackingSystem.comments', [
        'issueTrackingSystem.comment', 'ngAnimate', 'ui.bootstrap'
])    
    .controller('CommentCtrl', [       
        '$scope',
        '$routeParams',
        'comment',
        'identity',
        'issue',
        function ($scope, $routeParams, comment, identity, issue) {
            $scope.isCollapsed = false;

            issue.getIssueById($routeParams.id)
                .then(function (issue) {
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

                    comment.getIssueComments($routeParams.id)
                        .then(function (comments) {
                            $scope.comments = comments.data;
                        });

                    $scope.addComment = function addComment(issueId, newComment) {
                        comment.addComment(issueId, newComment)
                            .then(function (result) {
                                $scope.comments = result.data;
                            });
                    };                
            
        }]);