angular.module('issueTrackingSystem.add-issue', [])
.directive('autocomplete', [function(){
    return {
        scope: { names: '=' },
        templateUrl: 'issues/add-issue.html'
    };
}]);