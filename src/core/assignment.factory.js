(function() {
    'use strict';

    angular
        .module('app')
        .factory('assignmentFactory', assignmentFactory);

    assignmentFactory.$inject = ['$http', '$q'];

    /* @ngInject */
    function assignmentFactory($http, $q) {
        var service = {
            getAssignments: getAssignments
        , '$q'};
        return service;

        ///, $q/////////////

        function getAssignments() {
        }
    }
})();