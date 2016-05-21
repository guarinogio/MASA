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
        $urlRouterProvider.otherwise('/ProfessorList');

        $stateProvider
            .state('ProfessorList', {
                parent: 'index',
                url: '/ProfessorList',
                views: {
                    'content@': {
                        templateUrl: 'partials/professor/professor_list.html',
                        controller: 'ProfessorListCtrl',
                        controllerAs: 'vm'
                    }
                }
            })

            .state('ProfessorCreate', {
                parent: 'index',
                url: '/ProfessorCreate',
                views: {
                    'content@': {
                        templateUrl: 'partials/professor/professor_create.html',
                        controller: 'ProfessorCreateCtrl',
                        controllerAs: 'vm' 
                    }
                }
            })
            
            .state('ProfessorUpdate', {
                parent: 'index',
                url: '/ProfessorUpdate',
                views: {
                    'content@': {
                        templateUrl: 'partials/professor/professor_update.html',
                        controller: 'ProfessorUpdateCtrl',
                        controllerAs: 'vm' 
                    }
                }
            })
    };
})();
