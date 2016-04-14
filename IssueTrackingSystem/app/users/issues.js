angular.module('issueTrackingSystem.users.issues', [])
        .factory('issues', [
            '$http',
            '$q',
            'BASE_URL',
            function ($http, $q, BASE_URL) {                             

                function getIssues(user) {
                    var data = "grant_type=password&username=" + user.userName + "&password=" + user.password;
                    var deferred = $q.defer();                    
                    
                        var response = $http.post(BASE_URL + 'api/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })                   
                        .then(function (response) {
                            localStorage['accessToken'] = response.data['access_token'];
                            deferred.resolve(response.data);
                        }, function (error) {

                        });

                    return deferred.promise;
                }                

                return {                    
                    getIssues: getIssues
                }
            }]);