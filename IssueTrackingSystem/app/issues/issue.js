angular.module('issueTrackingSystem.issue', [])
        .factory('issue', [
            '$http',
            '$q',            
            'BASE_URL',            
            function ($http, $q, BASE_URL) {               

                function getIssueById(id) {
                    var deferred = $q.defer();                   
                    
                    data = "Bearer " + JSON.parse(sessionStorage['currentUser']).access_token;
                    
                
                    $http.get(BASE_URL + 'issues/' + id, { headers: { 'Authorization': data } })
                            .then(function(result) {
                                deferred.resolve(result);
                                console.log(result);
                            });                   

                    return deferred.promise;
                }
               
                return {
                    getIssueById: getIssueById
                }
            }]);







