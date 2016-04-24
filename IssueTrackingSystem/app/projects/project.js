angular.module('issueTrackingSystem.project', [])
        .factory('project', [
            '$http',
            '$q',            
            'BASE_URL',            
            function ($http, $q, BASE_URL) {                

                function getProjectById(id) {
                    var deferred = $q.defer();
                
                    $http.get(BASE_URL + 'Projects/' + id, { headers: { 'Authorization': $http.defaults.headers.common.Authorization } })
                            .then(function(result) {
                                deferred.resolve(result);                                
                            });                   

                    return deferred.promise;
                }

                function getProjectIssues(id) {
                    var deferred = $q.defer();

                    $http.get(BASE_URL + 'Projects/' + id + '/Issues', { headers: { 'Authorization': $http.defaults.headers.common.Authorization  } })
                            .then(function (result) {
                                deferred.resolve(result);
                            });

                    return deferred.promise;
                }

                function editProject(id, projectData) {
                    var deferred = $q.defer();

                    $http.put(BASE_URL + 'projects/' + id, projectData, { headers: { 'Authorization': $http.defaults.headers.common.Authorization  } })
                        .then(function(result) {
                            deferred.resolve(result);                            
                        });

                    return deferred.promise;
                }
               
                return {
                    getProjectById: getProjectById,
                    getProjectIssues: getProjectIssues,
                    editProject : editProject
                }
            }]);







