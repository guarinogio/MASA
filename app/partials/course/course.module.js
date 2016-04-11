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
                url: '/CourseList',
                views: {
                    sidebar: {
                        templateUrl: 'partials/sidebar/sidebar.html',
                        controller: 'SidebarCtrl'
                    },
                    navbar: {
                        templateUrl: 'partials/sidebar/navbar.html'
                    },
                    content: {
                        templateUrl: 'partials/course/course_list.html',
                        controller: 'CourseListCtrl',
                        controllerAs: "vm"
                    }
                }
            })
            
            .state('CourseCreate', {
                url: '/CourseCreate',
                views: {
                    sidebar: {
                        templateUrl: 'partials/sidebar/sidebar.html',
                        controller: 'SidebarCtrl'
                    },
                    navbar: {
                        templateUrl: 'partials/sidebar/navbar.html'
                    },
                    content: {
                        templateUrl: 'partials/course/course_create.html',
                        controller: 'CourseCreateCtrl',
                        controllerAs: "vm"
                    }
                }
            })
            
    };
})();
