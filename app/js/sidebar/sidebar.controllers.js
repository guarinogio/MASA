(function(){
    'use strict';

    angular
        .module('app')
        .controller('sidebarCtrl', ['$scope',
      function($scope) {
           
        var that = this;
        $scope.showChilds = function(item){
        item.active = !item.active;};

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
                
                  text: 'Modulo de Estudiantes', 
                    subItems: [
                        {
                            state: 'listarEstudiante',
                            text: 'Listar Estudiantes'
                        },
                        {
                            state: 'crearEstudiante',
                            text: 'Agregar Estudiantes'
                      }
                    ]
                },
                {
                
                  text: 'Modulo de Matriculas', 
                    subItems: [
                         {
                            state: 'listarMatricula',
                            text: 'Listar Matricula'
                        },
                        {
                            state: 'crearMatricula',
                            text: 'Crear Matricula'
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
        
      
    }])

})();
