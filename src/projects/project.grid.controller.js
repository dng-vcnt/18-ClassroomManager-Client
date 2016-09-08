(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProjectGridController', ProjectGridController);

    ProjectGridController.$inject = ['$stateParams'];

    /* @ngInject */
    function ProjectGridController($stateParams) {
        var vm = this;
        vm.title = 'ProjectGridController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();