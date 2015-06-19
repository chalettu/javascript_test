(function() {
  'use strict';

  angular
    .module('tuple')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("app", {
        templateUrl: "app/components/template/site.tmpl.html",
        abstract:true
      })
      .state("app.listTasks",{
        url:"/",

        views:{
          "content":{
            controller:"MainController",
            templateUrl:"app/main/view_task.tmpl.html"
          }
        }
      })
      .state("app.createTask",{
        url:"/createTask",

        views:{
          "content":{
            controller:"CreateTaskController",
            templateUrl:"app/main/create_task.tmpl.html"
          }
        }
      })
      .state("app.editTask",{
        url:"/editTask/:id",

        views:{
          "content":{
            controller:"EditTaskController",
            templateUrl:"app/main/edit_task.tmpl.html"
          }
        }
      })
      .state('home', {
        url: '/home',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
