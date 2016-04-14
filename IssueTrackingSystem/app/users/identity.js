angular.module('issueTrackingSystem.users.identity', [])
    .factory('identity', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {

            var deferred = $q.defer();

            var currentUser = undefined;

            var accessToken = 'FoXJboofRVWquUflBi7tZrIVz5V1zsLOIW32tJdjx48YggR4D_fIrPw6kpCFsh5amQBzzs5EpHpiy18rmfCFIsF_2gTUB0cNagZaT10h5ut8eckXAWCgiRsrvr7Uy6lTasRJ4265fV8otLEsdyIXqlTnp_EspQsxJkgY5wTBS48Q3tHUN3a6pbLfWa0clzlXpSRYM6H29TGMaLA3_8mJvZ-NydKE554DtMkkqOJdOMdfairr2rs58xzoOSm_hjC6vfTDhG89Zhq9JTW-62jcxkoPrOgRiqpbLsR-aZR_Di90oCQpld9YdsT-FiEUdWxvjhpuROrWFljjKebV7a2r5jb3BTzMjSJrHW5PvtpzjUHmRDV0Crol9ZjjWjfVYl7nx94xyhXrNHsPv4xUq-_XnsIE8UXFPd3EhWL5EgqdySpqi3f90BLX0_vFSCuwJ67S49UUysHK4IvNBXbwCnXSYE877SvdSvYoDf6le7I6yL4';

            $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;

            $http.get(BASE_URL + 'me')
                .then(function (response) {
                    currentUser = response.data;
                    deferred.resolve(currentUser);
                });

            return {
                getCurrentUser: function () {
                    if (currentUser) {
                        return $q.when(currentUser);
                    }
                    else {
                        return deferred.promise;
                    }
                },
                isAuthenticated: function () {
                    return true;
                }
            };
        }]);