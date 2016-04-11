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
                url: '/reportesPorMateria',
                views: {
                    sidebar: {
                        templateUrl: 'partials/sidebar/sidebar.html',
                        controller: 'SidebarCtrl'
                    },
                    navbar: {
                        templateUrl: 'partials/sidebar/navbar.html'
                    },
                    content: {
                        templateUrl: 'partials/report/course_report.html',
                        controller: 'CourseReportCtrl',
                        controllerAs: 'vm' 
                    }
                }
            })
           .state('sectionReport', {
                url: '/reportesPorSeccion',
                views: {
                    sidebar: {
                        templateUrl: 'partials/sidebar/sidebar.html',
                        controller: 'SidebarCtrl'
                    },
                    navbar: {
                        templateUrl: 'partials/sidebar/navbar.html'
                    },
                    content: {
                        templateUrl: 'partials/report/section_report.html',
                        controller: 'SectionReportCtrl',
                        controllerAs: 'vm' 
                    }
                }
            })
            .state('studentReport', {
                url: '/reportesPorEstudiante',
                views: {
                    sidebar: {
                        templateUrl: 'partials/sidebar/sidebar.html',
                        controller: 'SidebarCtrl'
                    },
                    navbar: {
                        templateUrl: 'partials/sidebar/navbar.html'
                    },
                    content: {
                        templateUrl: 'partials/report/student_report.html',
                        controller: 'StudentReportCtrl',
                        controllerAs: 'vm'
                    } 
                }
            })
            .state('studentAssist', {
                url: '/asistenciaPorEstudiante',
                views: {
                    sidebar: {
                        templateUrl: 'partials/sidebar/sidebar.html',
                        controller: 'SidebarCtrl'
                    },
                    navbar: {
                        templateUrl: 'partials/sidebar/navbar.html'
                    },
                    content: {
                        templateUrl: 'partials/report/student_assist.html',
                        controller: 'StudentAssistCtrl',
                        controllerAs: 'vm'
                    } 
                }
            })
            .state('sectionAssist', {
                url: '/asistenciaPorSeccion',
                views: {
                    sidebar: {
                        templateUrl: 'partials/sidebar/sidebar.html',
                        controller: 'SidebarCtrl'
                    },
                    navbar: {
                        templateUrl: 'partials/sidebar/navbar.html'
                    },
                    content: {
                        templateUrl: 'partials/report/section_assist.html',
                        controller: 'SectionAssistCtrl',
                        controllerAs: 'vm'
                    } 
                }
            })
            .state('courseAssist', {
                url: '/asistenciaPorMateria',
                views: {
                    sidebar: {
                        templateUrl: 'partials/sidebar/sidebar.html',
                        controller: 'SidebarCtrl'
                    },
                    navbar: {
                        templateUrl: 'partials/sidebar/navbar.html'
                    },
                    content: {
                        templateUrl: 'partials/report/course_assist.html',
                        controller: 'CourseAssistCtrl',
                        controllerAs: 'vm'
                    } 
                }
            })
    };
})();
