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
        $urlRouterProvider.otherwise('/CourseList');
        $stateProvider
           .state('CourseList', {
                parent: 'index',
                url: '/CourseList',
                views: {
                    'content@': {
                        templateUrl: 'partials/course/course_list.html',
                        controller: 'CourseListCtrl',
                        controllerAs: "vm"
                    }
                }
            })
            .state('CourseCreate', {
                parent:'index',
                url: '/CourseCreate',
                views: {
                    'content@': {
                        templateUrl: 'partials/course/course_create.html',
                        controller: 'CourseCreateCtrl',
                        controllerAs: "vm"
                    }
                }
            })
    };
})();
