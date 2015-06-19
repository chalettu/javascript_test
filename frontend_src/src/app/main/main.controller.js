(function() {
  'use strict';

  angular
    .module('tuple')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope,$timeout, AppFactory) {

    $scope.task={"name":"","description":"","due":""};
    $scope.task.name="test";
    AppFactory.create($scope.task);

    $scope.getTasks=function(){

      AppFactory.get().then(function(data){
        $scope.tasks=data;
      });

    };

    $scope.deleteTask=function(task){

      AppFactory.delete(task.id).then(function(data){
        alert("Record was deleted");
        $scope.getTasks();
      });
    };

    $scope.getTasks();

  }
})();
