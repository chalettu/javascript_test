(function() {
  'use strict';

  angular
    .module('tuple')
    .controller('CreateTaskController', CreateTaskController);

  /** @ngInject */
  function CreateTaskController($scope,$stateParams,$timeout, AppFactory) {
    $scope.task={"name":"","description":"","due":""};

    $scope.createTask=function(){

      AppFactory.create($scope.task).then(function(data){
        $scope.message='Task has been created';

      });
    }

  }
})();
