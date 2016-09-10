(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProjectDetailController', ProjectDetailController);

    ProjectDetailController.$inject = [
                                        '$stateParams', 
                                        'assignmentFactory',
                                        'projectFactory', 
                                        'studentFactory', 
                                        'toastr'
                                      ];

    /* @ngInject */
    function ProjectDetailController($stateParams, assignmentFactory, projectFactory, studentFactory, toastr) {
        var vm = this;
        vm.title = 'ProjectDetailController';

        // variables
        vm.project;
        vm.projectId = $stateParams.projectId;
        vm.studentsList;


        //functions
        vm.assignStudent = assignStudent;
        vm.getStudentsList = getStudentsList;
        vm.getProjectById = getProjectById;
        vm.saveProject = saveProject;
        vm.saveUpdate = saveUpdate;
        vm.updateProject = vm.updateProject;

        activate();

        ////////////////

        function activate() {
            getStudentsList();

            if (typeof vm.projectId !== 'undefined') {
                getProjectById(vm.projectId);
            }

        }

        function assignStudent(projectId, studentId) {
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

        function getStudentsList() {
            studentFactory.getStudents().then (
                function(data) {
                    vm.studentsList = data;
                },
                function(error) {
                    toastr.error(error.status, error.statusText);
                    console.log(error);
                }
            );
        }

        function getProjectById(projectId) {
            projectFactory.getProjectById(projectId).then (
                function(data) {
                    vm.project = data;
                },
                function(error) {
                    toastr.error(error.status, error.statusText);
                    console.log(error);
                }
            );
        }

        function saveProject(newProject) {
            projectFactory.saveProject(newProject).then (
                function(data) {
                    toastr.success("Project successfully added");
                },
                function(error) {
                    toastr.error(error.status, error.statusText);
                    console.log(error);
                }
            );
        }

        function saveUpdate(project) {
            if (typeof project.projectId !== 'undefined') {
                updateProject(project);
            }
            else {
                saveProject(project);
            }
        }

        function updateProject(project) {
            projectFactory.updateProject(project).then (
                function(response) {
                    toastr.success("Project successfully updated");
                },
                function(error) {
                    toastr.error(error.status, error.statusText);
                    console.log(error);
                }
            );
        }
    }
})();