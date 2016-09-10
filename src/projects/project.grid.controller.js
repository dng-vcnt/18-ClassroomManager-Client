(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProjectGridController', ProjectGridController);

    ProjectGridController.$inject = ['$stateParams', 'projectFactory', 'toastr'];

    /* @ngInject */
    function ProjectGridController($stateParams, projectFactory, toastr) {
        var vm = this;
        vm.title = 'ProjectGridController';

        // variables
        vm.projects;

        // functions
        vm.deleteProject = deleteProject;
        vm.getProjects = getProjects;

        activate();

        ////////////////

        function activate() {
            getProjects();
        }

        function deleteProject(project) {
            projectFactory.deleteProject(project).then (
                function(response) {
                    var i = vm.projects.indexOf(project);
                    vm.projects.splice(i, 1);
                    toastr.success("Project successfully deleted");
                },
                function(error) {
                    toastr.error(error.status, error.statusText);
                    console.log(error);
                }
            );
        }

        function getProjects() {
            projectFactory.getProjects().then (
                function(data) {
                    vm.projects = data;
                },
                function(error) {
                    toastr.error(error.stats, error.statusText);
                    console.log(error);
                }
            );
        }
    }
})();