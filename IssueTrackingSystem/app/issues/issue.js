angular.module('issueTrackingSystem.issue', [])
        .factory('issue', [
            '$http',
            '$q',            
            'BASE_URL',            
            function ($http, $q, BASE_URL) {
                var data = "Bearer " + JSON.parse(sessionStorage['currentUser']).access_token;

                function getIssueById(id) {
                    var deferred = $q.defer();
                
                    $http.get(BASE_URL + 'issues/' + id, { headers: { 'Authorization': data } })
                            .then(function(result) {
                                deferred.resolve(result);
                            });                   

                    return deferred.promise;
                }

                function changeStatus(issueId, statusId) {
                    var deferred = $q.defer();

                    $http.put(BASE_URL + 'Issues/' + issueId + '/changestatus?statusid=' + statusId, statusId, { headers: { 'Authorization': data } })
                        .then(function(result) {
                            deferred.resolve(result);
                        });

                    return deferred.promise;
                }

                function editIssue(id, issueData) {
                    var deferred = $q.defer();

                    $http.put(BASE_URL + 'Issues/' + id, issueData, { headers: { 'Authorization': data } })
                        .then(function(result) {
                            deferred.resolve(result);
                        });

                    return deferred.promise;
                }


                return {
                    getIssueById: getIssueById,
                    changeStatus: changeStatus,
                    editIssue : editIssue
                }
            }]);







