(function() {
    'use strict';

    angular
        .module('app')
        .controller('StudentDetailController', StudentDetailController);

    StudentDetailController.$inject = [
                                        '$stateParams', 
                                        'assignmentFactory',
                                        'studentFactory',
                                        'projectFactory',
                                        'toastr'
                                      ];

    /* @ngInject */
    function StudentDetailController($stateParams, assignmentFactory, studentFactory, projectFactory, toastr) {
        var vm = this;
        vm.title = 'StudentDetailController';

        // variables
        vm.hide = false;
        vm.projectsList;
        vm.student; 
        vm.studentId = $stateParams.studentId;

        // functions
        vm.assignProject = assignProject;
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
                vm.hide = false;
            }
            else {
                vm.hide = true;
            }
        }

        function assignProject(projectId, studentId) {
            if (!projectId || !studentId) {     
                return 0;
            }
            assignmentFactory.assign(projectId, studentId).then (
                function(data) {
                    toastr.success("Successfully assigned project");
                },
                function(error) {
                    toastr.error(error.status, error.statusText);
                    console.log(error);
                }
            );
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