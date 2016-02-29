(function (){
    'user strict';
    
    angular.module('app', [
            'app.course',
            'app.login',
            'app.professor',
            'app.reports',
            'app.section',
            'app.student',
            'ngResource',
            'ui.router'
    ])

    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');
        
        $stateProvider
            .state('login', {
                url: '/login',
                views: {
                    content: {
                templateUrl: 'login.html',
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
