(function() {
    'use strict';

    angular
        .module('app')
        .factory('studentFactory', studentFactory);

    studentFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function studentFactory($http, $q, apiUrl) {
        var service = {
            deleteStudent: deleteStudent,
            getStudents: getStudents,
            getStudentById: getStudentById,
            saveStudent: saveStudent,
            updateStudent: updateStudent
        };
        return service;

        ////////////////

        function deleteStudent(student) {
            var defer = $q.defer();
            $http.delete(apiUrl + 'students/' + student.studentId).then (
                function(response) {
                    defer.resolve(response.data);
                },
                function(error) {
                    defer.reject(error.status, error.statusText);
                }
            );
            return defer.promise;
        }

        // Gets list of student objects from database
        function getStudents() {
        	var defer = $q.defer();
        	$http.get(apiUrl + 'students').then (
        		function(response) {
        			defer.resolve(response.data);
        		},
        		function(error) {
        			defer.reject(error);
        		}
      		);
      		return defer.promise;
        }

        // Gets student object from student id
        function getStudentById(studentId) {
            var defer = $q.defer();
            $http.get(apiUrl + 'students/' + studentId).then (
                function(response) {
                    defer.resolve(response.data);
                },
                function(error) {
                    defer.reject(error);
                }
            );
            return defer.promise;
        }

        // Save student information into database
        function saveStudent(newStudent) {
            var defer = $q.defer();
            $http.post(apiUrl + 'students', newStudent).then (
                function(response) {
                    defer.resolve(response.data);
                },
                function(error) {
                    defer.reject(error);
                }
            );
            return defer.promise;
        }

        // Update student information
        function updateStudent(student) {
            var defer = $q.defer();
            $http.put(apiUrl + 'students/' + student.studentId, student).then (
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