/* global malarkey:false, toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('tuple')
    .constant('moment', moment)
    .constant("REST_SERVER","http://127.0.0.1:8000/");

})();
