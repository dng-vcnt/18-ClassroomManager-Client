(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProjectDetailController', ProjectDetailController);

    ProjectDetailController.$inject = ['$stateParams'];

    /* @ngInject */
    function ProjectDetailController($stateParams) {
        var vm = this;
        vm.title = 'ProjectDetailController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();