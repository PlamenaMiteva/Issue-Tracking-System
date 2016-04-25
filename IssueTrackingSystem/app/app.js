'use strict';

angular.module('issueTrackingSystem', [
        'ngRoute',
        'ngCookies',
        "ui.bootstrap",
        'issueTrackingSystem.common',
        'issueTrackingSystem.home',
        'issueTrackingSystem.dashboard',
        'issueTrackingSystem.board',
        'issueTrackingSystem.users.authentication',
        'issueTrackingSystem.users.identity',
        'issueTrackingSystem.users.usersService',
        'issueTrackingSystem.profile',
        'issueTrackingSystem.projects',
        'issueTrackingSystem.edit-project',
        'issueTrackingSystem.project',
        'issueTrackingSystem.adminProjects',
        'issueTrackingSystem.issue',
        'issueTrackingSystem.issues',
        'issueTrackingSystem.edit-issue',
        'issueTrackingSystem.add-issue',
        'issueTrackingSystem.label',
        'issueTrackingSystem.common.modal',
])
    .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        $routeProvider.when('/projects', {
            templateUrl: 'projects/allProjects.html',
            controller: 'adminProjectsCtrl',
            isAdmin: 'true',
        });

      $routeProvider.otherwise({redirectTo: '/'});

      $httpProvider.interceptors.push(['$q','toastr', function($q, toastr) {
                    return {
                            'responseError': function(rejection) {
                                    if (rejection.data && rejection.data['error_description']) {
                                            toastr.error(rejection.data['error_description']);
                                    }
                                    else if (rejection.data && rejection.data.modelState && rejection.data.modelState['']){
                                            var errors = rejection.data.modelState[''];
                                            if (errors.length > 0) {
                                                    toastr.error(errors[0]);
                                            }
                                    }

                                    return $q.reject(rejection);
                            }
                    }
            }]);

    }])
    .run(['$rootScope', '$location', 'authentication', function($rootScope, $location, authentication) {
            $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
                    if (rejection == 'Unauthorized Access') {
                            $location.path('/');
                    }
            });

            authentication.refreshCookie();            
    }])    
    .constant('toastr', toastr)
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
