'use strict';

angular.module('issueTrackingSystem.comments', [
        'issueTrackingSystem.comment', 'ngAnimate', 'ui.bootstrap'
])    
    .controller('CommentCtrl', [       
        '$scope',
        '$routeParams',
        'comment',
        function ($scope, $routeParams, comment) {           
            $scope.isCollapsed = false;
            
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