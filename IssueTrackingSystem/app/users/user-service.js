angular.module('issueTrackingSystem.users.usersService', [])
        .factory('usersService', [
            '$http',
            '$q',
            'BASE_URL',
            function ($http, $q, BASE_URL) {

                function getAllUsers() {
                    var deferred = $q.defer();

                    $http.get(BASE_URL + 'Users', { headers: { 'Authorization': $http.defaults.headers.common.Authorization } })
                        .then(function(result) {
                            deferred.resolve(result);
                        });

                    return deferred.promise;
                }

                function changePassword(userData) {
                    var deferred = $q.defer();

                    $http.post(BASE_URL + 'api/Account/ChangePassword', userData, { headers: { 'Authorization': $http.defaults.headers.common.Authorization } })
                        .then(function(result) {
                        deferred.resolve(result);
                    });

                    return deferred.promise;
                }

                return {
                    getAllUsers: getAllUsers,
                    changePassword: changePassword
                }
            }]);