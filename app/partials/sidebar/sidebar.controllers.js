(function(){
    'use strict';

    angular
        .module('app')
        .controller('SidebarCtrl', SidebarCtrl)

    SidebarCtrl.$inject = ['$scope'];
    function SidebarCtrl($scope) {   
        var that = this;
        $scope.showChilds = function(item){
            item.active = !item.active;
        };

        $scope.items = [
            {
                text: 'Módulo de Administración', 
                subItems: [
                    {
                        state: 'ProfessorList',
                        text: 'Listado de Profesores'
                    },
                    {
                        state: 'ProfessorCreate',
                        text: 'Nuevo Profesor'
                  }
                ]
            },
            {
                text: 'Módulo de Materias', 
                subItems: [
                    {
                        state: 'CourseList',
                        text: 'Listado de Materias'
                    },
                    {
                        state: 'CourseCreate',
                        text: 'Nueva Materia'
                  }
                ]
            },                
            {
                text: 'Módulo de Reportes', 
                subItems: [
                    {
                        state: 'courseReport',
                        text: 'Reportes por Materia'
                    }     
                ]   
            }
        ];
    };
})();
