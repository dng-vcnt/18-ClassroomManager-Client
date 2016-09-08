(function() {
    'use strict';

    angular
        .module('app')
        .factory('studentFactory', studentFactory);

    studentFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function studentFactory($http, $q, apiUrl) {
        var service = {
            getStudents: getStudents
        };
        return service;

        ////////////////

        function getStudents() {
        	var defer = $q.defer();
        	$http.get(apiUrl + 'students').then (
        		function(response) {
        			defer.resolve(response.data);
        		},
        		function(error) {
        			defer.reject(error);
        		}
      		);
      		return defer.promise;
        }
    }
})();