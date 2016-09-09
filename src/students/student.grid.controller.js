(function() {
    'use strict';

    angular
        .module('app')
        .controller('StudentGridController', StudentGridController);

    StudentGridController.$inject = [
                                        '$stateParams', 
                                        'studentFactory',
                                        'toastr'
                                    ];

    /* @ngInject */
    function StudentGridController($stateParams, studentFactory, toastr) {
        var vm = this;
        vm.title = 'StudentGridController';

        // variables
        vm.students = 0;

        // functions
        vm.deleteStudent = deleteStudent;
        vm.getStudents = getStudents;

        activate();

        ////////////////

        function activate() {
            getStudents();
        }

        function deleteStudent(student) {
            studentFactory.deleteStudent(student).then (
                function(response) {
                    var i = vm.students.indexOf(student);
                    vm.students.splice(i, 1);
                    toastr.success("Student successfully deleted");
                },
                function(error) {
                    toastr.error(error.status, error.statusText);
                    console.log(error);
                }
            );
        }

        function getStudents() {
            studentFactory.getStudents().then (
                function(data) {
                    vm.students = data;
                },
                function(error) {
                    toastr.error(error.stats, error.statusText);
                    console.log(error);
                }
            );
        }
    }
})();