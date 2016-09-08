(function() {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = [
                                    '$stateParams', 
                                    'studentFactory'
                                  ];

    /* @ngInject */
    function DashboardController($stateParams, studentFactory) {
        var vm = this;
        vm.title = 'DashboardController';

        // variables
        vm.studentCount = 0;
        vm.projectCount = 0;
        vm.assignmentCount = 0;

        // functions
        vm.getAssignments = getAssignments;
        vm.getStudents = getStudents;
        vm.getProjects = getProjects;

        activate();

        ////////////////

        function activate() {
            getStudents();
        }

        function getStudents() {
            studentFactory.getStudents().then (
                function(data) {
                    console.log(data);
                    vm.studentCount = data;
                },
                function(error) {
                    console.log(error);
                }
            );
        }

    }
})();