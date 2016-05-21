(function(){
    'use strict';

    angular
        .module('app.student')
        .controller('StudentCreateCtrl', StudentCreateCtrl)

    StudentCreateCtrl.$inject = ['$scope', '$state', 'professors', '$modal', 'selectedSection', 'selectedCourse', 'authentication'];
    function StudentCreateCtrl($scope, $state, professors, $modal, selectedSection, selectedCourse, authentication){
        
        var vm = this;
        var duplicated = false;
        var user = authentication.currentUser();
        var professorid = user._id;
        vm.professor = {};
        vm.mensaje = "";
        vm.actOk = false;

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

                vm.botonOk = false;
                $scope.modalInstance = $modal.open({
                    templateUrl: 'partials/students/modal/create_students_modal.html',
                    scope: $scope,
                    size: 'sm'
                });

                angular.forEach (vm.professor.courses[selectedCourse.index].sections[selectedSection.index].students, 
                    function (value){
                        if(value.id == vm.estudiante.Cedula) duplicated = true;
                });
                if (!duplicated){
                    vm.professor.courses[selectedCourse.index].sections[selectedSection.index].students.push(person);

                    professors.update({ id: professorid }, vm.professor,
                        function(){
                            vm.botonOk = true;
                            vm.mensaje = "Estudiante " + vm.estudiante.Apellido + ", " + vm.estudiante.Nombre + " agregado";
                        },

                        function(){
                            vm.botonOk = true;
                            vm.mensaje = "Error al agregar al estudiante " + vm.estudiante.Apellido + ", " + vm.estudiante.Nombre;
                        });
                } else {
                    vm.botonOk = true;
                    vm.mensaje = "Estudiante con cedula " + vm.estudiante.Cedula + " ya esta en la lista.";
                }
            }
        }

        $scope.ok = function (urlLo) {
            $state.go('SectionUpdate');
            $scope.modalInstance.dismiss('cancel');
        };

        $scope.cancel = function () {
            $scope.modalInstance.dismiss('cancel');
        };

        vm.back = function () {
            $state.go('SectionUpdate');
        };  
    };
})();