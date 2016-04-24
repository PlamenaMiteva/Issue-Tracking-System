angular.module('issueTrackingSystem.label', [])
        .factory('label', [
            '$http',
            '$q',            
            'BASE_URL',            
            function ($http, $q, BASE_URL) {
                              
                function getLabels(filter) {
                    return $http.get(BASE_URL + 'Labels/?filter=' + filter, { headers: { 'Authorization': $http.defaults.headers.common.Authorization  } })
                    .then(function (response) {
                        return response.data.map(function (item) {
                            return { name: item.Name };
                        });
                    });
                }

                return {
                    getLabels : getLabels
                }
                
           }]);







