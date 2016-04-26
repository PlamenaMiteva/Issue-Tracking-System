'use strict';

angular.module('issueTrackingSystem.add-issue', [
        'issueTrackingSystem.issue'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/:id/add-issue', {
            templateUrl: 'issues/add-issue.html',
            controller: 'AddIssueCtrl'
        })
    }])
    .controller('AddIssueCtrl', [
        '$scope',        
        '$location',
        '$routeParams',
        'identity',
        'issue',
        'project',
        'usersService',
        'label',        
        function ($scope, $location, $routeParams, identity, issue, project, usersService, label) {
            $scope.isLead = false;

            project.getProjectById($routeParams.id)
               .then(function (project) {
                   $scope.project = project.data;

                   identity.getCurrentUser().then(function (response) {                      
                       if (response.Id == project.data.Lead.Id || response.isAdmin) {
                           $scope.isLead = true;
                       }
                   });

                   usersService.getAllUsers()
                       .then(function (response) {
                           $scope.users = response.data;
                       });

               });


            $scope.getAllLabels = function (val) {
                var data = $http.defaults.headers.common.Authorization;
                return label.getLabels(val);
            }


            $scope.addLabel = function addLabel(labels, newLabelName) {
                var newLabel = {
                    "Name": newLabelName
                };

                labels.push(newLabel);
            }

            $scope.today = function() {
                $scope.dt = new Date();
            };
            $scope.today();

            $scope.clear = function() {
                $scope.dt = null;
            };

            $scope.inlineOptions = {
                customClass: getDayClass,
                minDate: new Date(),
                showWeeks: true
            };

            $scope.dateOptions = {
                dateDisabled: disabled,
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };

            // Disable weekend selection
            function disabled(data) {
                var date = data.date,
                    mode = data.mode;
                return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
            }

            $scope.toggleMin = function() {
                $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
                $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
            };

            $scope.toggleMin();

            $scope.open1 = function() {
                $scope.popup1.opened = true;
            };
            
            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];
            $scope.altInputFormats = ['M!/d!/yyyy'];

            $scope.popup1 = {
                opened: false
            };

            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            var afterTomorrow = new Date();
            afterTomorrow.setDate(tomorrow.getDate() + 1);
            $scope.events = [
              {
                  date: tomorrow,
                  status: 'full'
              },
              {
                  date: afterTomorrow,
                  status: 'partially'
              }
            ];

            function getDayClass(data) {
                var date = data.date, mode = data.mode;
                if (mode === 'day') {
                    var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                    for (var i = 0; i < $scope.events.length; i++) {
                        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                        if (dayToCheck === currentDay) {
                            return $scope.events[i].status;
                        }
                    }
                }

                return '';
            }

            $scope.setDueDate = function setDuedate(dt) {
                $scope.DueDate = dt;
                console.log($scope.DueDate);
            }

            $scope.addIssue = function addIssue(projectId, input) {                
                input.ProjectId = projectId;
                input.Labels = $scope.project.Labels;
                input.DueDate = $scope.DueDate;
                issue.addIssue(projectId, input)
                    .then(function (result) {
                        $location.path('/issues/' + result.data.Id);
                    });
            };

        }]);