(function(){

    'use strict';

    angular
        .module("app.login", ['ui.router', 'ui.bootstrap'])
        .run(addStateToScope)
        .config(getRoutes);

    addStateToScope.$inject = ['$rootScope', '$state', '$stateParams'];
    function addStateToScope($rootScope, $state, $stateParams){
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    };

    getRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];
    function getRoutes($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('root', {
                url: '',
                views: {
                    content: {
                        templateUrl: 'login.html',
                        controller: 'LoginCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            
            
    };
})();
