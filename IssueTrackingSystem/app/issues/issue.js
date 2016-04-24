angular.module('issueTrackingSystem.issue', [])
        .factory('issue', [
            '$http',
            '$q',            
            'BASE_URL',            
            function ($http, $q, BASE_URL) {

                function getIssueById(id) {
                    var deferred = $q.defer();
                
                    $http.get(BASE_URL + 'issues/' + id, { headers: { 'Authorization': $http.defaults.headers.common.Authorization } })
                            .then(function(result) {
                                deferred.resolve(result);
                            });                   

                    return deferred.promise;
                }

                function changeStatus(issueId, statusId) {
                    var deferred = $q.defer();

                    $http.put(BASE_URL + 'Issues/' + issueId + '/changestatus?statusid=' + statusId, statusId, { headers: { 'Authorization': $http.defaults.headers.common.Authorization  } })
                        .then(function(result) {
                            deferred.resolve(result);
                        });

                    return deferred.promise;
                }

                function editIssue(id, issueData) {
                    var deferred = $q.defer();

                    $http.put(BASE_URL + 'Issues/' + id, issueData, { headers: { 'Authorization': $http.defaults.headers.common.Authorization  } })
                        .then(function(result) {
                            deferred.resolve(result);
                        });

                    return deferred.promise;
                }

                function addIssue(projectId, issueData) {
                    var deferred = $q.defer();

                    $http.post(BASE_URL + 'Issues/', issueData, { headers: { 'Authorization': $http.defaults.headers.common.Authorization  } })
                        .then(function (result) {
                            deferred.resolve(result);
                        });

                    return deferred.promise;
                }


                return {
                    getIssueById: getIssueById,
                    changeStatus: changeStatus,
                    editIssue: editIssue,
                    addIssue : addIssue
                }
            }]);







