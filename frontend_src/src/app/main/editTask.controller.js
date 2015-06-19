(function() {
  'use strict';

  angular
    .module('tuple')
    .controller('EditTaskController', EditTaskController);

  /** @ngInject */
  function EditTaskController($scope,$stateParams,$timeout, AppFactory) {
    $scope.task_id=$stateParams.id;
    $scope.message="";
    $scope.task={};



      AppFactory.get($scope.task_id).then(function(data){
        $scope.task=data;
        console.log($scope.task);
      });

    $scope.updateTask=function(){

      AppFactory.update($scope.task).then(function(data){
        $scope.message='Task has been updated';

      });
    }

  }
})();
