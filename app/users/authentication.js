angular.module('issueTrackingSystem.users.authentication', [])
        .factory('authentication', [
            '$http',
            '$cookies',
            '$q',
            '$location',
            'identity',
            'BASE_URL',
            function ($http, $cookies, $q, $location, identity, BASE_URL) {

                var AUTHENTICATION_COOKIE_KEY = '!__Authentication_Cookie_Key__!';

                function preserveUserData(data) {
                    var accessToken = data.access_token;
                    $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                    $cookies.put(AUTHENTICATION_COOKIE_KEY, accessToken);
                }

                function registerUser(user) {
                    var deferred = $q.defer();

                    $http.post(BASE_URL + 'api/Account/Register', user)
                        .then(function (response) {
                            var data = "grant_type=password&username=" + user.email + "&password=" + user.password;
                            var response = $http.post(BASE_URL + 'api/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                        .then(function (response) {
                            preserveUserData(response.data);

                            identity.requestUserProfile()
                                .then(function () {
                                    deferred.resolve(response.data);
                                });
                        });
                   });

                    return deferred.promise;
                }

                function loginUser(user) {
                    var data = "grant_type=password&username=" + user.userName + "&password=" + user.password;
                    var deferred = $q.defer();

                    var response = $http.post(BASE_URL + 'api/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                    .then(function (response) {
                        preserveUserData(response.data);

                        identity.requestUserProfile()
                            .then(function () {
                                deferred.resolve(response.data);
                            });
                    });

                    return deferred.promise;
                }

                function logout() {
                    $cookies.remove(AUTHENTICATION_COOKIE_KEY);
                    $http.defaults.headers.common.Authorization = undefined;
                    identity.removeUserProfile();
                }

                function isAuthenticated() {
                    return !!$cookies.get(AUTHENTICATION_COOKIE_KEY);
                }

                function isLoggedIn() {
                    var isLoggedIn = !!$cookies.get(AUTHENTICATION_COOKIE_KEY);
                    if (isLoggedIn) {
                        return true;
                    } else {
                        return $q.reject('Not Authenticated');
                    }
                }

                function isAdmin() {
                    var isLoggedIn = !!$cookies.get(AUTHENTICATION_COOKIE_KEY);

                    if (isLoggedIn) {
                        result = identity.getCurrentUser()
                        .then(function (user) {
                            if (user.isAdmin) {
                                sessionStorage['isAdmin'] = true;
                            }
                        });
                    }
                    if (sessionStorage['isAdmin'] == 'true') {
                        return true;
                    } else {
                        return $q.reject('Not Authenticated');
                    }
                }

                function refreshCookie() {
                    if (isAuthenticated()) {
                        $http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get(AUTHENTICATION_COOKIE_KEY);
                        identity.requestUserProfile();
                    }
                }

                return {
                    registerUser: registerUser,
                    loginUser: loginUser,
                    logout: logout,
                    refreshCookie: refreshCookie,
                    isAuthenticated: isAuthenticated,
                    isLoggedIn: isLoggedIn,
                    isAdmin: isAdmin
                }
            }]);