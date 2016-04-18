'use strict';

angular.module('issueTrackingSystem', [
        'ngRoute',
        'issueTrackingSystem.common',
        'issueTrackingSystem.home',
        'issueTrackingSystem.users.dashboard',
        'issueTrackingSystem.users.board',
        'issueTrackingSystem.users.identity',
        'issueTrackingSystem.users.authentication',
        'issueTrackingSystem.users.usersService',
        'issueTrackingSystem.projects',
        'issueTrackingSystem.edit-project',
        'issueTrackingSystem.project',
        'issueTrackingSystem.issues',
        'issueTrackingSystem.issue', 
        'issueTrackingSystem.edit-issue',
        'issueTrackingSystem.add-issue'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({ redirectTo: '/' });
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
