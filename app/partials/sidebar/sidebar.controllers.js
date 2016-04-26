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
                        text: 'Listar Profesores'
                    },
                    {
                        state: 'ProfessorCreate',
                        text: 'Agregar Profesores'
                  }
                ]
            },
            {
                text: 'Módulo de Materias', 
                subItems: [
                    {
                        state: 'CourseList',
                        text: 'Listar Materias'
                    },
                    {
                        state: 'CourseCreate',
                        text: 'Agregar Materia'
                  }
                ]
            },                
            {
                text: 'Módulo de Reportes', 
                subItems: [
                    {
                        state: 'courseReport',
                        text: 'Reportes'
                    }     
                ]
            }
        ];
    };
})();
