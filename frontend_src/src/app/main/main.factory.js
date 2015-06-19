
  'use strict';
  angular.module('tuple').factory("AppFactory", function ($rootScope, $http, $q, $window, $location,REST_SERVER) {

    var factory = {};

        factory.create=function(task){

          var config={
            method: 'POST',
            url:REST_SERVER+"todos",
            dataType: 'json',
            data: task
          };

          var deferred = $q.defer();
          var result_data = {};

          var promise = $http(config)
            .success(function(data, status, headers, config) {
              result_data = data;
              deferred.resolve(result_data);
            }).
            error(function(data, status, headers, config) {
              deferred.reject(status);
            });

          return deferred.promise;



        };

        factory.get=function(task_id){

          var config={};
          var deferred = $q.defer();
          var result_data = {};


          if (task_id===undefined){
            config.method="GET";
            config.url=REST_SERVER+"todos";
          }
          else{
            config.method='GET';
            config.url=REST_SERVER+"todos/"+task_id;
          }

          var promise = $http(config)
            .success(function(data, status, headers, config) {
              result_data = data;
              deferred.resolve(result_data);
            }).
            error(function(data, status, headers, config) {
              deferred.reject(status);
            });

          return deferred.promise;

        };
        factory.update=function(task_obj){

          var config={
            method: 'PUT',
            url:REST_SERVER+"todos",
            dataType: 'json',
            data: task_obj
          };

          var deferred = $q.defer();
          var result_data = {};

          var promise = $http(config)
            .success(function(data, status, headers, config) {
              result_data = data;
              deferred.resolve(result_data);
            }).
            error(function(data, status, headers, config) {
              deferred.reject(status);
            });

          return deferred.promise;


        };
        factory.delete=function(task_id){
          var config={
            method: 'DELETE',
            url:REST_SERVER+"todos",
            dataType: 'json',
            data: {"id":task_id}
          };

          var deferred = $q.defer();
          var result_data = {};

          var promise = $http(config)
            .success(function(data, status, headers, config) {
              result_data = data;
              deferred.resolve(result_data);
            }).
            error(function(data, status, headers, config) {
              deferred.reject(status);
            });

          return deferred.promise;
        };
    return factory;
  });
