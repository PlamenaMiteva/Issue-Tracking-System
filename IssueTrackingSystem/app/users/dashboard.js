angular.module('issueTrackingSystem.users.dashboard', [])
        .factory('dashboard', [            
            '$http',
            '$q',            
            'BASE_URL',
            'authentication',
            function ($http, $q, BASE_URL, authentication) {
               
                    function showUserDashboard(pageSize, pageNumber) {

                    var deferred = $q.defer();                    
                    
                    data = "Bearer " + localStorage['accessToken'];                    
                
                    $http.get(BASE_URL + 'Issues/me?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&orderBy=DueDate', { headers: { 'Authorization': data } })
                            .then(function (result) {         
                                deferred.resolve(result);                                
                            });  

                    return deferred.promise;
                }
               
                return {
                    showUserDashboard: showUserDashboard   
                }
            }]);







