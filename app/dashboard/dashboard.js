angular.module('issueTrackingSystem.dashboard', [])
        .factory('dashboard', [
            '$http',
            '$q',
            'BASE_URL',
            'authentication',
            function ($http, $q, BASE_URL, authentication) {                

                function showUserDashboard(pageSize, pageNumber) {
                    var deferred = $q.defer();

                    $http.get(BASE_URL + 'Issues/me?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&orderBy=DueDate desc', { headers: { 'Authorization': $http.defaults.headers.common.Authorization  } })
                            .then(function (result) {
                                deferred.resolve(result);
                            });

                    return deferred.promise;
                }

                function getAllProjects() {
                    var deferred = $q.defer();
                    
                    $http.get(BASE_URL + 'Projects', { headers: { 'Authorization': $http.defaults.headers.common.Authorization  } })
                            .then(function (result) {
                                deferred.resolve(result);
                            });

                    return deferred.promise;
                }

                return {
                    showUserDashboard: showUserDashboard,
                    getAllProjects: getAllProjects
                }
            }]);







