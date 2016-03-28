(function(){
    'use strict';

    angular
        .module("app.section", ['ui.router', 'ui.bootstrap'])
        .run(addStateToScope)
        .config(getRoutes);

    addStateToScope.$inject = ['$rootScope', '$state', '$stateParams'];
    function addStateToScope($rootScope, $state, $stateParams){
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    };

    getRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];
    function getRoutes($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/listarMatricula');

        $stateProvider

            .state('listarMatricula', {
                url: '/listarMatricula',
                views: {
                    sidebar: {
                        templateUrl: 'partials/sidebar/sidebar.html',
                        controller: 'sidebarCtrl'
                    },
                    navbar: {
                        templateUrl: 'partials/sidebar/navbar.html'
                    },
                    content: {
                        templateUrl: 'partials/section/list_section.html',
                        controller: 'listarMatriculaCtrl',
                        controllerAs: 'vm'
                    }
                }
            })

            .state('crearMatricula', {
                url: '/crearMatricula',
                views: {
                    sidebar: {
                        templateUrl: 'partials/sidebar/sidebar.html',
                        controller: 'sidebarCtrl'
                    },
                    navbar: {
                        templateUrl: 'partials/sidebar/navbar.html'
                    },
                    content: {
                        templateUrl: 'partials/section/create_section.html',
                        controller: 'crearMatriculaCtrl',
                        controllerAs: 'vm'
                    }
                }
            })

             .state('actualizarMatricula', {
                url: '/actualizarMatricula',
                views: {
                    sidebar: {
                        templateUrl: 'partials/sidebar/sidebar.html',
                        controller: 'sidebarCtrl'
                    },
                    navbar: {
                        templateUrl: 'partials/sidebar/navbar.html'
                    },
                    content: {
                        templateUrl: 'partials/section/update_section.html',
                        controller: 'actualizarMatriculaCtrl',
                        controllerAs: 'vm'
                    }
                }
            })


    };
})();

