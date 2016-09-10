(function() {
    'use strict';

    angular
        .module('app')
        .factory('assignmentFactory', assignmentFactory);

    assignmentFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function assignmentFactory($http, $q, apiUrl) {
        var service = {
            assign : assign,
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

        function assign(projectId, studentId) {
            var assignment = { 
                                'studentId' : studentId,
                                'projectId' : projectId
                             };
                             
            var defer = $q.defer();
            $http.post(apiUrl + 'assignments', assignment).then (
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