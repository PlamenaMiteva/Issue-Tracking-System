'use strict';

angular.module('issueTrackingSystem', [
        'ngRoute',
        "ui.bootstrap",
        'issueTrackingSystem.common',
        'issueTrackingSystem.home',
        'issueTrackingSystem.dashboard',
        'issueTrackingSystem.board',
        'issueTrackingSystem.users.authentication',
        'issueTrackingSystem.users.usersService',
        'issueTrackingSystem.projects',
        'issueTrackingSystem.edit-project',
        'issueTrackingSystem.project',
        'issueTrackingSystem.issues',
        'issueTrackingSystem.issue', 
        'issueTrackingSystem.edit-issue',
        'issueTrackingSystem.add-issue',
        'issueTrackingSystem.label',
        'issueTrackingSystem.common.modal',
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({ redirectTo: '/' });
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
