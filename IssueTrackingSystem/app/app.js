'use strict';

angular.module('issueTrackingSystem', [
        'ngRoute',
        'issueTrackingSystem.common',
        'issueTrackingSystem.home',
        'issueTrackingSystem.users.dashboard',
        'issueTrackingSystem.users.board',
        'issueTrackingSystem.users.identity',
        'issueTrackingSystem.users.authentication',
        'issueTrackingSystem.projects',
        'issueTrackingSystem.project'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({ redirectTo: '/' });
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
