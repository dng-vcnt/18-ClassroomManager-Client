(function() {
    'use strict';

    angular
        .module('app')
        .controller('StudentDetailController', StudentDetailController);

    StudentDetailController.$inject = [
                                        '$stateParams', 
                                        'studentFactory',
                                        'projectFactory',
                                        'toastr'
                                      ];

    /* @ngInject */
    function StudentDetailController($stateParams, studentFactory, projectFactory, toastr) {
        var vm = this;
        vm.title = 'StudentDetailController';

        // variables
        vm.projectsList;
        vm.student; 
        vm.studentId = $stateParams.studentId;

        // functions
        vm.getProjectsList = getProjectsList;
        vm.getStudentById = getStudentById;
        vm.saveStudent = saveStudent;
        vm.saveUpdate = saveUpdate;
        vm.updateStudent = updateStudent;

        activate();

        ////////////////

        function activate() {
            getProjectsList();

            if (typeof vm.studentId !== 'undefined') {
                getStudentById(vm.studentId);
            }
        }

        function getProjectsList() {
            projectFactory.getProjects().then (
                function(data) {
                    vm.projectsList = data;
                },
                function(error) {
                    toastr.error(error.status, error.statusText);
                    console.log(error);
                }
            );
        }

        function getStudentById(studentId) {
            studentFactory.getStudentById(studentId).then (
                function(data) {
                    vm.student = data;
                },
                function(error) {
                    toastr.error(error.status, error.statusText);
                    console.log(error);
                }
            );
        }

        function saveStudent(newStudent) {
            studentFactory.saveStudent(newStudent).then (
                function(data) {
                    toastr.success("Student successfully added");
                },
                function(error) {
                    toastr.error(error.status, error.statusText);
                    console.log(error);
                }
            );
        }

        function saveUpdate(student) {
            if (typeof student.studentId !== 'undefined') {
                updateStudent(student);
            }
            else {
                saveStudent(student);
            }
        }

        function updateStudent(student) {
            studentFactory.updateStudent(student).then (
                function(response) {
                    toastr.success("Student successfully updated");
                },
                function(error) {
                    toastr.error(error.status, error.statusText);
                    console.log(error);
                }
            );
        }
    }
})();