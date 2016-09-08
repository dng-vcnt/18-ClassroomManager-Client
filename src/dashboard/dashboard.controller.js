(function() {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = [
                                    'studentFactory', 
                                    'projectFactory', 
                                    'assignmentFactory', 
                                    'toastr'
                                    ];

    /* @ngInject */
    function DashboardController(studentFactory, projectFactory, assignmentFactory, toastr) {
        var vm = this;
        vm.title = 'DashboardController';

        // variables        
        vm.assignmentCount = 0;
        vm.projectCount = 0;
        vm.studentCount = 0;

        // functions
        vm.getAssignmentCount = getAssignmentCount;
        vm.getProjectCount = getProjectCount;
        vm.getStudentCount = getStudentCount;

        activate();

        ////////////////

        function activate() {
            getStudentCount();
            getAssignmentCount();
            getProjectCount();
        }

        // Retrieve the nummber of assignments in the database
        function getAssignmentCount() {
            assignmentFactory.getAssignments().then (
                function(data) {
                    vm.assignmentCount = data.length;
                },
                function(error) {
                    toastr.error(error.status, error.statusText);
                    console.log(error);
                }
            );
        }

        // Retrieve the number of projects in the database
        function getProjectCount() {
            projectFactory.getProjects().then (
                function(data) {
                    vm.projectCount = data.length;
                },
                function(error) {
                    toastr.error(error.status, error.statusText);
                    console.log(error);
                }
            );
        }

        // Retrieve the number of students in the database
        function getStudentCount() {
            studentFactory.getStudents().then (
                function(data) {
                    vm.studentCount = data.length;
                },
                function(error) {
                    toastr.error(error.status, error.statusText);
                    console.log(error);
                }
            );
        }
    }
})();