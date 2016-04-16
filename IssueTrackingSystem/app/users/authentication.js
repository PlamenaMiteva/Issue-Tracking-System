angular.module('issueTrackingSystem.users.authentication', [])
        .factory('authentication', [
            '$http',
            '$q',
            'BASE_URL',
            function ($http, $q, BASE_URL) {
                var token = "";

                function registerUser(user) {
                    var deferred = $q.defer();

                    $http.post(BASE_URL + 'api/Account/Register', user)
                        .then(function (response) {
                            deferred.resolve(response.data);
                            sessionStorage['currentUser'] = JSON.stringify(response.data);
                        }, function (error) {

                        });

                    return deferred.promise;
                }

                function loginUser(user) {
                    var data = "grant_type=password&username=" + user.userName + "&password=" + user.password;
                    var deferred = $q.defer();                    
                    
                        var response = $http.post(BASE_URL + 'api/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })                   
                        .then(function (response) {
                            token = response.data['access_token'];
                            sessionStorage['currentUser'] = JSON.stringify(response.data);
                            //data = "Bearer " + accessToken;
                            //$http.get(BASE_URL + 'projects', { headers: { 'Authorization': data } }).then(function (response) {
                            //    var projects = response.data;
                            //    $scope.projects= projects;
                            //});                            
                            deferred.resolve(response.data);
                        }, function (error) {

                        });

                    return deferred.promise;
                }

                function logout() {

                }

                function isLoggedIn() {
                    return true;
                    //return sessionStorage['currentUser'] != undefined;
                }

                return {
                    token: token,
                    registerUser: registerUser,
                    loginUser: loginUser,
                    logout: logout,
                    isLoggedIn: isLoggedIn
                }
            }]);