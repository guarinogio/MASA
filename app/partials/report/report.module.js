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
        $urlRouterProvider.otherwise('/reportes');

        $stateProvider
            
           .state('poblacionNacimiento', {
                url: '/reportes',
                views: {
                    sidebar: {
                      templateUrl: 'partials/sidebar/sidebar.html',
                      controller: 'sidebarCtrl'
                    },
                    navbar: {
                      templateUrl: 'partials/sidebar/navbar.html'
                    },
                    content: {
                templateUrl: 'partials/reportes/reportes.html',
                controller: 'poblacionNacimientoCtrl',
                controllerAs: 'vm' 
            }
        }
            })
           .state('poblacionActiva', {
                url: '/poblacionActivaCtrl',
                templateUrl: 'partials/reportes/reportes.html',
                controller: 'poblacionActivaCtrl',
                controllerAs: 'vm' 
            })
           .state('hombresEdad', {
                url: '/hombresEdad',
                templateUrl: 'partials/reportes/reportes.html',
                controller: 'hombresEdadCtrl',
                controllerAs: 'vm' 
            })
            .state('mujeresEdad', {
                url: '/mujeresEdad',
                templateUrl: 'partials/reportes/reportes.html',
                controller: 'mujeresEdadCtrl',
                controllerAs: 'vm' 
            })
            .state('comidasDia', {
                url: '/comidasDia',
                templateUrl: 'partials/reportes/reportes.html',
                controller: 'comidasDiaCtrl',
                controllerAs: 'vm' 
            })
           .state('nivelEducacion', {
                url: '/nivelEducacion',
                templateUrl: 'partials/reportes/reportes.html',
                controller: 'nivelEducacionCtrl',
                controllerAs: 'vm' 
            })
            .state('serviciosHogares', {
                url: '/serviciosHogares',
                templateUrl: 'partials/reportes/reportes.html',
                controller: 'serviciosHogaresCtrl',
                controllerAs: 'vm' 
            })
           .state('ingresosAnuales', {
                url: '/ingresosAnuales',
                templateUrl: 'partials/reportes/reportes.html',
                controller: 'ingresosAnualesCtrl',
                controllerAs: 'vm' 
            })
    };
})();
