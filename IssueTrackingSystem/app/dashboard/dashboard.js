angular.module('issueTrackingSystem.users.dashboard', [])
        .factory('dashboard', [
            '$http',
            '$q',
            'BASE_URL',
            'authentication',
            function ($http, $q, BASE_URL, authentication) {
                

                function showUserDashboard(pageSize, pageNumber) {
                    var deferred = $q.defer();
                    data = "Bearer " + JSON.parse(sessionStorage['currentUser']).access_token;

                    $http.get(BASE_URL + 'Issues/me?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&orderBy=DueDate desc', { headers: { 'Authorization': data } })
                            .then(function (result) {
                                deferred.resolve(result);
                            });

                    return deferred.promise;
                }

                function getAllProjects() {
                    var deferred = $q.defer();
                    data = "Bearer " + JSON.parse(sessionStorage['currentUser']).access_token;

                    $http.get(BASE_URL + 'Projects', { headers: { 'Authorization': data } })
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







