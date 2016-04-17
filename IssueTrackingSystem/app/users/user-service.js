angular.module('issueTrackingSystem.users.usersService', [])
        .factory('usersService', [
            '$http',
            '$q',
            'BASE_URL',
            function ($http, $q, BASE_URL) {

                function getAllUsers() {
                    var deferred = $q.defer();
                    data = "Bearer " + JSON.parse(sessionStorage['currentUser']).access_token;

                    $http.get(BASE_URL + 'Users', { headers: { 'Authorization': data } })
                        .then(function(result) {
                            deferred.resolve(result);
                        });

                    return deferred.promise;
                }

                return {
                    getAllUsers: getAllUsers
                }
            }]);