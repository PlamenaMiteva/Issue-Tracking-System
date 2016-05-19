'use strict';

angular.module('issueTrackingSystem.common.modal', ['ui.bootstrap'])
    .controller('ModalInstanceCtrl',[
        '$scope',
        '$uibModalInstance',
    function ($scope, $uibModalInstance) { 
        $scope.message = $scope.message;
        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
}]);