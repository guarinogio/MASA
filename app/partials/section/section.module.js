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
        $urlRouterProvider.otherwise('/SectionList');

        $stateProvider
            .state('SectionList', {
                parent: 'index',
                url: '/SectionList',
                views: {
                    'content@': {
                        templateUrl: 'partials/section/section_list.html',
                        controller: 'SectionListCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('SectionCreate', {
                parent: 'index',
                url: '/SectionCreate',
                views: {
                    'content@': {
                        templateUrl: 'partials/section/section_create.html',
                        controller: 'SectionCreateCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('SectionUpdate', {
                parent: 'index',
                url: '/SectionUpdate',
                views: {
                    'content@': {
                        templateUrl: 'partials/section/section_update.html',
                        controller: 'SectionUpdateCtrl',
                        controllerAs: 'vm'
                    }
                }
            })


    };
})();

