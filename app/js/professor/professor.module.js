(function(){
    'use strict';

    angular
        .module("app.professor", ['ui.router', 'ui.bootstrap'])
        .run(addStateToScope)
        .config(getRoutes);

    addStateToScope.$inject = ['$rootScope', '$state', '$stateParams'];
    function addStateToScope($rootScope, $state, $stateParams){
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    };

    getRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];
    function getRoutes($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/listarProfesor');

        $stateProvider
            .state('listarProfesor', {
                url: '/listarProfesor',
                views: {
                    sidebar: {
                      templateUrl: 'partials/sidebar.html',
                      controller: 'sidebarCtrl'

                    },
                    navbar: {
                      templateUrl: 'partials/navbar.html'
                    },
                    content: {
                templateUrl: 'partials/professor/list_professor.html',
                controller: 'listarProfesorCtrl',
                controllerAs: 'vm'
            }
        }
            })

            .state('crearProfesor', {
                url: '/crearProfesor',
                views: {
                    sidebar: {
                      templateUrl: 'partials/sidebar.html',
                      controller: 'sidebarCtrl'
                    },
                    navbar: {
                      templateUrl: 'partials/navbar.html'
                    },
                    content: {
                templateUrl: 'partials/professor/create_professor.html',
                controller: 'crearProfesorCtrl',
                controllerAs: 'vm' 
            }
        }
            })
            
            .state('actualizarProfesor', {
                url: '/actualizarProfesor',
                views: {
                    sidebar: {
                      templateUrl: 'partials/sidebar.html',
                      controller: 'sidebarCtrl'
                    },
                    navbar: {
                      templateUrl: 'partials/navbar.html'
                    },
                    content: {
                templateUrl: 'partials/professor/update_professor.html',
                controller: 'actualizarProfesorCtrl',
                controllerAs: 'vm' 
            }
        }
            })
    };
})();
