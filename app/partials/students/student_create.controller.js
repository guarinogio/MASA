(function(){
    'use strict';

    angular
        .module('app.student')
        .controller('StudentCreateCtrl', StudentCreateCtrl)

    StudentCreateCtrl.$inject = ['$scope', '$rootScope', '$state', 'professors', '$modal', 'selectedSection', 'selectedCourse'];
    function StudentCreateCtrl($scope, $rootScope, $state, professors, $modal, selectedSection, selectedCourse){
        
        var vm = this;
        var duplicated = false;
        var professorid = $rootScope.professorId;
        vm.professor = {};
        $rootScope.mensaje = "";
        $rootScope.actOk = false;

        professors.get({ id: professorid }, 
            function (successResult){
                vm.professor = successResult;
            }, 
            function (){
                console.log("Error al obtener los datos.");

        });

        vm.submit = function() {

            if (vm.data_input_form.$valid){
                var person = {
                    "id": vm.estudiante.Cedula,
                    "name": vm.estudiante.Nombre,
                    "lastname": vm.estudiante.Apellido,
                    "email": vm.estudiante.Correo
                };

                $rootScope.crearEstudianteLoading = true;
                $rootScope.botonOk = false;
                $scope.modalInstance = $modal.open({
                    animation: $rootScope.animationsEnabled,
                    templateUrl: 'partials/students/modal/create_students_modal.html',
                    scope: $scope,
                    size: 'sm',
                    resolve: {
                        items: function () {
                            return $rootScope.items;
                        }
                    }
                });

                angular.forEach (vm.professor.courses[selectedCourse.index].sections[selectedSection.index].students, 
                    function (value){
                        if(value.id == vm.estudiante.Cedula) duplicated = true;
                });
                if (!duplicated){
                    vm.professor.courses[selectedCourse.index].sections[selectedSection.index].students.push(person);

                    professors.update({ id: professorid }, vm.professor,
                        function(){
                            $rootScope.botonOk = true;
                            $rootScope.urlLo = 'actualizarMatricula';
                            $rootScope.mensaje = "Estudiante " + vm.estudiante.Apellido + ", " + vm.estudiante.Nombre + " agregado";
                            $rootScope.crearEstudianteLoading = false;
                        },

                        function(){
                            $rootScope.botonOk = true;
                            $rootScope.mensaje = "Error al agregar al estudiante " + vm.estudiante.Apellido + ", " + vm.estudiante.Nombre;
                            $rootScope.crearEstudianteLoading = false;
                        });
                } else {
                    $rootScope.botonOk = true;
                    $rootScope.mensaje = "Estudiante con cedula " + vm.estudiante.Cedula + " ya esta en la lista.";
                    $rootScope.crearEstudianteLoading = false;
                }
            }else{
                vm.submitted = true;
            }
        }

        $scope.ok = function (urlLo) {
            $state.go('SectionUpdate');
            $scope.modalInstance.dismiss('cancel');
        };

        $scope.cancel = function () {
            $scope.modalInstance.dismiss('cancel');
        };

        $rootScope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $rootScope.opened = true;
        };

        vm.back = function () {
            $state.go('SectionUpdate');
        };  

        return vm;
    };
})();