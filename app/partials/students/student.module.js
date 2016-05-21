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
        $urlRouterProvider.otherwise('/StudentCreate');

        $stateProvider
            .state('StudentCreate', {
                parent: 'index',
                url: '/StudentCreate',
                views: {
                    'content@': {
                        templateUrl: 'partials/students/student_create.html',
                        controller: 'StudentCreateCtrl',
                        controllerAs: 'vm' 
                    }
                }
            })
            .state('StudentUpdate', {
                parent: 'index',
                url: '/StudentUpdate',
                views: {
                    'content@': {
                        templateUrl: 'partials/students/student_update.html',
                        controller: 'StudentUpdateCtrl',
                        controllerAs: 'vm' 
                    }
                }
            })
    };
})();
