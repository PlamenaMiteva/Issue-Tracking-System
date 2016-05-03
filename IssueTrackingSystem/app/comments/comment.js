angular.module('issueTrackingSystem.comment', [])
        .factory('comment', [
            '$http',
            '$q',            
            'BASE_URL',            
            function ($http, $q, BASE_URL) {

                function getIssueComments(issueId) {
                    var deferred = $q.defer();
                
                    $http.get(BASE_URL + 'Issues/' + issueId + '/comments', { headers: { 'Authorization': $http.defaults.headers.common.Authorization } })
                            .then(function(result) {
                                deferred.resolve(result);
                            });                   

                    return deferred.promise;
                }

                function addComment(issueId, commentText) {
                    var deferred = $q.defer();

                    $http.post(BASE_URL + 'Issues/' + issueId + '/comments', commentText, { headers: { 'Authorization': $http.defaults.headers.common.Authorization } })
                        .then(function (result) {
                            deferred.resolve(result);
                        });

                    return deferred.promise;
                }


                return {
                    getIssueComments: getIssueComments,
                    addComment: addComment                    
                }
            }]);







