(function(){
    'use strict';

    angular
        .module("app.student", ['ui.router', 'ui.bootstrap'])
        .run(addStateToScope)
        .config(getRoutes);

    addStateToScope.$inject = ['$rootScope', '$state', '$stateParams'];
    function addStateToScope($rootScope, $state, $stateParams){
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    };

    getRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];
    function getRoutes($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/listarEstudiante');

        $stateProvider
            .state('listarEstudiante', {
                url: '/listarEstudiante',
                views: {
                    sidebar: {
                      templateUrl: 'partials/sidebar/sidebar.html',
                      controller: 'sidebarCtrl'

                    },
                    navbar: {
                      templateUrl: 'partials/sidebar/navbar.html'
                    },
                    content: {
                templateUrl: 'partials/students/list_students.html',
                controller: 'listarEstudianteCtrl',
                controllerAs: 'vm'
            }
        }
            })

            .state('crearEstudiante', {
                url: '/crearEstudiante',
                views: {
                    sidebar: {
                      templateUrl: 'partials/sidebar/sidebar.html',
                      controller: 'sidebarCtrl'
                    },
                    navbar: {
                      templateUrl: 'partials/sidebar/navbar.html'
                    },
                    content: {
                templateUrl: 'partials/students/create_students.html',
                controller: 'crearEstudianteCtrl',
                controllerAs: 'vm' 
            }
        }
            })
            
            .state('actualizarEstudiante', {
                url: '/actualizarEstudiante',
                views: {
                    sidebar: {
                      templateUrl: 'partials/sidebar/sidebar.html',
                      controller: 'sidebarCtrl'
                    },
                    navbar: {
                      templateUrl: 'partials/sidebar/navbar.html'
                    },
                    content: {
                templateUrl: 'partials/students/update_students.html',
                controller: 'actualizarEstudianteCtrl',
                controllerAs: 'vm' 
            }
        }
            })
    };
})();
