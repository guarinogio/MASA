(function(){
    'use strict';

    angular
        .module('app')
        .controller('sidebarCtrl', sidebarCtrl)

    sidebarCtrl.$inject = ['$scope'];
    function sidebarCtrl($scope) {
           
        var that = this;
        $scope.showChilds = function(item){
            item.active = !item.active;
        };

        $scope.items = [
            {
            
              text: 'Modulo de Administración', 
                subItems: [
                    {
                        state: 'listarProfesor',
                        text: 'Listar Profesores'
                    },
                    {
                        state: 'crearProfesor',
                        text: 'Agregar Profesores'
                  }
                ]
            },
            {
            
              text: 'Modulo de Materias', 
                subItems: [
                    {
                        state: 'listarMateria',
                        text: 'Listar Materias'
                    },
                    {
                        state: 'crearMateria',
                        text: 'Agregar Materia'
                  }
                ]
            },                
            {
            
              text: 'Modulo de Reportes', 
                subItems: [
                    {
                        state: 'reportesAlumno',
                        text: 'Reportes por Alumno'
                    },
                    {
                        state: 'reportesClase',
                        text: 'Reportes por Clase'
                    },
                    {
                        state: 'reportesSeccion',
                        text: 'Reportes por Seccion'
                    },
                    {
                        state: 'reportesMateria',
                        text: 'Reportes por Materia'
                    }
                ]
            }
        ];
    };
})();
