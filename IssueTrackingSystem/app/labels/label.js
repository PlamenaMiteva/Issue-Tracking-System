angular.module('issueTrackingSystem.label', [])
        .factory('label', [
            '$http',
            '$q',            
            'BASE_URL',            
            function ($http, $q, BASE_URL) {
                var data = "Bearer " + JSON.parse(sessionStorage['currentUser']).access_token;
                
                function getLabels(filter) {
                    return $http.get(BASE_URL + 'Labels/?filter=' + filter, { headers: { 'Authorization': data } })
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







