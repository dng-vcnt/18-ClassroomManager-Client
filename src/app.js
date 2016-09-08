(function() {
	'use strict';
	
	angular
		.module('app', ['ui.router', 'toastr'])
		.value('apiUrl', 'http://http://localhost:64882/api/')
    .config(appConfig);

	appConfig.$inject = ['$urlRouterProvider', '$stateProvider']

	function appConfig($urlRouterProvider, $stateProvider) {

    	$urlRouterProvider.otherwise('/dashboard');
           
      $stateProvider
      	.state('dashboard', {
              url: '/dashboard',
              templateUrl: '/dashboard/dashboard.html',
              controller: 'DashboardController as dashboard'
        })
        .state('project', {
              url: '/project',
							abstract: true,
							template: '<div ui-view></div'           
        })
						.state('project.grid', {
									url: '/grid',
									templateUrl: '/projects/project.grid.html',
									controller: 'ProjectGridController as projectGrid'
						})
						.state('project.detail', {
									url: '/detail?',
									templateUrl: '/projects/project.detail.html',
									controller: 'ProjectDetailController as projectDetail'
						})
				.state('student', {
							url: '/student',
							abstract: true,
							template: '<div ui-view></div>'
				})
						.state('student.grid', {
									url: '/grid',
									templateUrl: '/students/student.grid.html',
									controller: 'StudentGridController as studentGrid'
						})
						.state('student.detail', {
									url: '/detail?',
									templateUrl: '/students/student.detail.html',
									controller: 'StudentDetailController as studentDetail'
						})

      };
})();