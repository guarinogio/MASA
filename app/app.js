(function (){
    'user strict';
    
    angular.module('app', [
        'app.course',
        'app.login',
        'app.professor',
        'app.reports',
        'app.section',
        'app.student',
        'chart.js',
        'ngResource',
        'ui.router'
    ])

    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');
         $stateProvider
            .state('index', {
                abstract: true,
                views: {
                    'sidebar': {
                        templateUrl: 'partials/sidebar/sidebar.html',
                        controller: 'SidebarCtrl'
                    },
                    'navbar': {
                        templateUrl: 'partials/sidebar/navbar.html',
                        controller: 'NavbarCtrl',
                        controllerAs: 'vm'
                    },
                }
            })
            .state('login', {
                url: '/login',
                views: {
                    content: {
                        templateUrl: 'partials/login/login.html',
                        controller: 'loginCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
    })

    .run(function ($rootScope) {
        $rootScope.domainUrl = 'Localhost:3000';
    });

})();
