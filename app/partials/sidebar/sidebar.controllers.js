(function(){
    'use strict';

    angular
        .module('app')
        .controller('SidebarCtrl', SidebarCtrl)

    SidebarCtrl.$inject = ['$scope', 'authentication'];
    function SidebarCtrl($scope, authentication) {   
        var that = this;
        $scope.showChilds = function(index){
            $scope.items[index].active = !$scope.items[index].active;
            collapseAnother(index);
        };

        var collapseAnother = function(index){
            for(var i=0; i<$scope.items.length; i++){
                if(i!=index){
                    $scope.items[i].active = false;
                }
            }
        };

        $scope.items = [];

        var permission = authentication.currentUser();
        
        if(permission.role=='admin'){
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
                }
            ];
        }
        if(permission.role=='professor'){
            $scope.items = [
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
        }
    };
})();
