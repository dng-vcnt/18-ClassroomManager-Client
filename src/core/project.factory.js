(function() {
    'use strict';

    angular
        .module('app')
        .factory('projectFactory', projectFactory);

    projectFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function projectFactory($http, $q, apiUrl) {
        var service = {
            deleteProject: deleteProject,
            getProjects: getProjects,
            getProjectById: getProjectById,
            saveProject: saveProject,
            updateProject: updateProject
        };
        return service;

        ////////////////

        function deleteProject(project) {
            var defer = $q.defer();
            $http.delete(apiUrl + 'projects/' + project.projectId).then (
                function(response) {
                    defer.resolve(response.data);
                    console.log(response.data);
                },
                function(error) {
                    defer.reject(error.status, error.statusText);
                }
            );
            return defer.promise;
        }

        // Gets list of project objects from database
        function getProjects() {
            var defer = $q.defer();
            $http.get(apiUrl + 'projects').then (
                function(response) {
                    defer.resolve(response.data);
                },
                function(error) {
                    defer.reject(error);
                }
            );
            return defer.promise;
        }

        // Gets project object from project id
        function getProjectById(projectId) {
            var defer = $q.defer();
            $http.get(apiUrl + 'projects/' + projectId).then (
                function(response) {
                    defer.resolve(response.data);
                },
                function(error) {
                    defer.reject(error);
                }
            );
            return defer.promise;
        }

        // Save project information into database
        function saveProject(newProject) {
            var defer = $q.defer();
            $http.post(apiUrl + 'projects', newProject).then (
                function(response) {
                    defer.resolve(response.data);
                },
                function(error) {
                    defer.reject(error);
                }
            );
            return defer.promise;
        }

        // Update project information
        function updateProject(project) {
            var defer = $q.defer();
            $http.put(apiUrl + 'projects/' + project.projectId, project).then (
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