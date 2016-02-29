(function(){
    'use strict';
    
    angular
        .module("app.course", ['ui.router', 'ui.bootstrap'])
        .run(addStateToScope)
        .config(getRoutes);

    addStateToScope.$inject = ['$rootScope', '$state', '$stateParams'];
    function addStateToScope($rootScope, $state, $stateParams){
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    };

    getRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];
    function getRoutes($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/listarMaterias');

        $stateProvider
           .state('listarMateria', {
                url: '/listarMateria',
                views: {
                    sidebar: {
                      templateUrl: 'partials/sidebar.html',
                      controller: 'sidebarCtrl'
                    },
                    navbar: {
                      templateUrl: 'partials/navbar.html'
                    },
                    content: {
                templateUrl: 'partials/course/list_course.html',
                controller: 'listarMateriaCtrl',
                controllerAs: "vm"
                    }
                }
            })
            
            .state('crearMateria', {
                url: '/crearMateria',
                views: {
                    sidebar: {
                      templateUrl: 'partials/sidebar.html',
                      controller: 'sidebarCtrl'
                    },
                    navbar: {
                      templateUrl: 'partials/navbar.html'
                    },
                    content: {
                templateUrl: 'partials/course/create_course.html',
                controller: 'crearMateriaCtrl',
                controllerAs: "vm"
                    }
                }
            })
            
    };
})();
