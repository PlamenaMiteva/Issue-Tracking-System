angular.module('issueTrackingSystem.label', [])
        .factory('label', [
            '$http',
            '$q',            
            'BASE_URL',            
            function ($http, $q, BASE_URL) {
                
                function getLabels(filter) {
                    var deferred = $q.defer();
                
                    $http.get(BASE_URL + 'Labels/?filter=' + filter)
                            .then(function(result) {
                                deferred.resolve(result);                                
                            });                   

                    return deferred.promise;
                }

                
                return {
                    getLabels: getLabels                    
                }
            }]);







