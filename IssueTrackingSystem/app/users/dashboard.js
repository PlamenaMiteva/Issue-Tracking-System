angular.module('issueTrackingSystem.users.dashboard', [])
        .factory('dashboard', [
            '$http',
            '$q',            
            'BASE_URL',
            'authentication',
            function ($http, $q, BASE_URL, authentication) {               

                function showUserDashboard(pageSize, pageNumber) {
                    var deferred = $q.defer();                    
                    pageSize = pageSize || 10;               
                    pageNumber = pageNumber || 1;
                    data = "Bearer " + localStorage['accessToken'];
                    
                
                    $http.get(BASE_URL + 'Issues/me?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&orderBy=DueDate', { headers: { 'Authorization': data } })
                            .then(function(result) {
                                deferred.resolve(result);
                                console.log(result);
                            });
                    
                    //data = "Bearer " + localStorage['accessToken'];                    
                    //$http.get(BASE_URL + 'projects', { headers: { 'Authorization': data } })
                    //        .then(function (response) { 
                    //        deferred.resolve(response);
                    //    }, function (error) {

                    //    });

                    return deferred.promise;
                }

               
                return {
                       showUserDashboard: showUserDashboard
                }
            }]);







