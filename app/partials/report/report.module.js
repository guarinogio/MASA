(function(){
    'use strict';

    angular
        .module("app.reports", ['ui.router', 'ui.bootstrap', 'chart.js'])
        .run(addStateToScope)
        .config(getRoutes);

    addStateToScope.$inject = ['$rootScope', '$state', '$stateParams'];
    function addStateToScope($rootScope, $state, $stateParams){
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    };

    getRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];
    function getRoutes($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/reportesPorMateria');

        $stateProvider
           .state('courseReport', {
                parent: 'index',
                url: '/reportesPorMateria',
                views: {
                    'content@': {
                        templateUrl: 'partials/report/course_report.html',
                        controller: 'CourseReportCtrl',
                        controllerAs: 'vm' 
                    }
                }
            })
           .state('sectionReport', {
                parent: 'index',
                url: '/reportesPorSeccion',
                views: {
                    'content@': {
                        templateUrl: 'partials/report/section_report.html',
                        controller: 'SectionReportCtrl',
                        controllerAs: 'vm' 
                    }
                }
            })
            .state('studentReport', {
                parent: 'index',
                url: '/reportesPorEstudiante',
                views: {
                    'content@': {
                        templateUrl: 'partials/report/student_report.html',
                        controller: 'StudentReportCtrl',
                        controllerAs: 'vm'
                    } 
                }
            })
            .state('studentAssist', {
                parent: 'index',
                url: '/asistenciaPorEstudiante',
                views: {
                    'content@': {
                        templateUrl: 'partials/report/student_assist.html',
                        controller: 'StudentAssistCtrl',
                        controllerAs: 'vm'
                    } 
                }
            })
            .state('sectionAssist', {
                parent: 'index',
                url: '/asistenciaPorSeccion',
                views: {
                    'content@': {
                        templateUrl: 'partials/report/section_assist.html',
                        controller: 'SectionAssistCtrl',
                        controllerAs: 'vm'
                    } 
                }
            })
            .state('courseAssist', {
                parent: 'index',
                url: '/asistenciaPorMateria',
                views: {
                    'content@': {
                        templateUrl: 'partials/report/course_assist.html',
                        controller: 'CourseAssistCtrl',
                        controllerAs: 'vm'
                    } 
                }
            })
    };
})();
