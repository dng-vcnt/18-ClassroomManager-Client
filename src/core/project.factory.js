(function() {
    'use strict';

    angular
        .module('app')
        .factory('projectFactory', projectFactory);

    projectFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function projectFactory($http, $q, apiUrl) {
        var service = {
            getProjects: getProjects
        };
        return service;

        ////////////////

        function getProjects() {
            var defer = $q.defer();
            $http.get(apiUrl + 'projects').then (
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