angular.module('issueTrackingSystem.project', [])
        .factory('project', [
            '$http',
            '$q',            
            'BASE_URL',            
            function ($http, $q, BASE_URL) {
                data = "Bearer " + JSON.parse(sessionStorage['currentUser']).access_token;

                function getProjectById(id) {
                    var deferred = $q.defer();
                
                    $http.get(BASE_URL + 'Projects/' + id, { headers: { 'Authorization': data } })
                            .then(function(result) {
                                deferred.resolve(result);                                
                            });                   

                    return deferred.promise;
                }

                function getProjectIssues(id) {
                    var deferred = $q.defer();

                    $http.get(BASE_URL + 'Projects/' + id + '/Issues', { headers: { 'Authorization': data } })
                            .then(function (result) {
                                deferred.resolve(result);
                            });

                    return deferred.promise;
                }

                function editProject(id, projectData) {
                    var deferred = $q.defer();

                    $http.put(BASE_URL + 'projects/' + id, projectData, { headers: { 'Authorization': data } })
                        .then(function(result) {
                            deferred.resolve(result);
                            console.log(result);
                        });

                    return deferred.promise;
                }
               
                return {
                    getProjectById: getProjectById,
                    getProjectIssues: getProjectIssues,
                    editProject : editProject
                }
            }]);







