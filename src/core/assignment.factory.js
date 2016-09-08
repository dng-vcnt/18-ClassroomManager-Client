(function() {
    'use strict';

    angular
        .module('app')
        .factory('assignmentFactory', assignmentFactory);

    assignmentFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function assignmentFactory($http, $q, apiUrl) {
        var service = {
            getAssignments: getAssignments
        };
        return service;

        ///, $q/////////////

        function getAssignments() {
            var defer = $q.defer();
            $http.get(apiUrl + 'assignments').then (
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